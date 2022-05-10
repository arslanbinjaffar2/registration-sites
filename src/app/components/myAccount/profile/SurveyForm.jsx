import React, { useState, useRef } from "react";
import Input from "@/forms/Input";
import DateTime from "@/forms/DateTime";
import Select from "react-select";
import SimpleReactValidator from "simple-react-validator";
import {
    updateSurveyData,
  } from "store/Slices/myAccount/surveySlice";
import { useDispatch } from "react-redux";
const SurveyForm = ({ surveyDetail, event, surveyResults, survey_id }) => {
  const dispatch = useDispatch();
  const [surveyResult, setSurveyResult] = useState({});
  const [surveyId, setSurveyId] = useState(survey_id);
  const [questions, setQuestions] = useState(
    surveyDetail
  );
  const [optionals, setOptionals] = useState(
    surveyDetail
      .filter((item) => item.required_question !== "1")
      .map((item) => item.id)
  );
  const [questionsType, setQuestionsType] = useState(
    surveyDetail.reduce(
      (ack, item) => Object.assign(ack, { [item.id]: item.question_type }),
      {}
    )
  );
  const [, forceUpdate] = useState(0);

  const simpleValidator = useRef(new SimpleReactValidator({
    element: (message) => <p className="error-message">{message}</p>,
    messages: {
      required: "This field is required!"
    },
    autoForceUpdate: { forceUpdate: () => forceUpdate(1) }
  }))
  const updateResult = (
    feild,
    type,
    answerId = 0,
    questionId,
    agendaId = 0,
    matrixId = 0
  ) => {
    if (type === "multiple") {
      if (Object.keys(surveyResult).length > 0) {
        console.log(surveyResult[feild]);
        let newObj = surveyResult;
        newObj[feild]=
        surveyResult[feild]
          ? (surveyResult[feild].indexOf(answerId) !== -1
            ? surveyResult[feild].filter((item) => (item !== answerId))
            : [...surveyResult[feild], answerId])
          : [answerId];
        // console.log(newObj);
          
        if (agendaId !== 0) {
            newObj[`answer_agenda_${answerId}`] = agendaId;
        }
        setSurveyResult({ ...newObj });
        console.log(surveyResult);
      } else {
        let newObj = {
          [feild]: [answerId],
        };
        if (agendaId !== 0) {
            newObj[`answer_agenda_${answerId}`] = agendaId;
        }
        setSurveyResult({ ...newObj });
      }
    }
    else if (type === "dropdown") {
      Object.keys(surveyResult).length > 0
        ? setSurveyResult({
            ...surveyResult,
            [feild]: [`${answerId.value}`],
          })
        : setSurveyResult({
            [feild]: [`${answerId.value}`],
          });
    }
    else if (type === "single") {
      if (Object.keys(surveyResult).length > 0) {
        let newObj = {
          [feild]: [answerId],
        };
        if (agendaId !== 0) {
          if (surveyResult[`answer_agenda_${answerId}`] === undefined) {
            newObj[`answer_agenda_${answerId}`] = agendaId;
          }
        }
        setSurveyResult({ ...surveyResult, ...newObj });
      } else {
        let newObj = {
          [feild]: [answerId],
        };
        if (agendaId !== 0) {
          if (surveyResult[`answer_agenda_${answerId}`] === undefined) {
            newObj[`answer_agenda_${answerId}`] = agendaId;
          }
        }
        setSurveyResult({ ...newObj });
      }
    }
   else if (type === "matrix") {
      if (Object.keys(surveyResult).length > 0) {
        console.log(feild);
        setSurveyResult({
          ...surveyResult,
          [feild]:
            surveyResult[feild] !== undefined
              ? surveyResult[feild].indexOf(answerId) !== -1  
                ? surveyResult[feild]
                : [...surveyResult[feild], answerId]
              : [answerId],
          [`answer_matrix${questionId}_${answerId}`]: [
            `${answerId}-${matrixId}`,
          ],
        });
      } else {
        setSurveyResult({
          [feild]: [answerId],
          [`answer_matrix${questionId}_${answerId}`]: [
            `${answerId}-${matrixId}`,
          ],
        });
      }
    } else {
      Object.keys(surveyResult).length > 0
        ? setSurveyResult({ ...surveyResult, [feild]: [answerId] })
        : setSurveyResult({ [feild]: [answerId] });
    }
  };



  const handleSave =(e) =>{
    const formValid = simpleValidator.current.allValid()
    if (!formValid) {
      simpleValidator.current.showMessages()
    }else{ 
        dispatch(updateSurveyData(event.id, event.url ,surveyId, {
          survey_id: surveyId,
          optionals,
          questionsType,
          questions:questions.reduce((ack, item) => { return ack.concat(item.id)},[]),
          ...surveyResult,
        }))
    }  
  }

  return (
    <React.Fragment>
      <div
        className={`manage-sub-registrations  wrapper-box other-information-sec`}
      >
        <React.Fragment>
          <div className="wrapper-inner-content">
            <div className="other-information-inner">
              {questions.map((question) => (
                <React.Fragment key={question.id}>
                  {question.question_type === "multiple" &&
                      <React.Fragment>
                        <div className="radio-check-field">
                          <h5>{question.value}</h5>
                          {question.answer.map((answer) => (
                            <label
                              key={answer.id}
                              onClick={() => {
                                updateResult(
                                  `answer${question.id}`,
                                  "multiple",
                                  answer.id,
                                  question.id,
                                );
                              }}
                              className={
                                surveyResult[`answer${question.id}`] !==
                                  undefined &&
                                surveyResult[`answer${question.id}`].indexOf(
                                  answer.id
                                ) !== -1
                                  ? "checked"
                                  : ""
                              }
                            >
                              <span>{answer.answer}</span>
                            </label>
                          ))}
                          {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, surveyResult[`answer${question.id}`] !== undefined ? true : null, 'required')}
                          {Number(question.enable_comments) === 1 && (
                            <div className="generic-form">
                              <p>Your comment:</p>
                              <textarea
                                placeholder="Your comment"
                                cols={30}
                                rows={5}
                                disabled={surveyResult[`answer${question.id}`] !== undefined ? false : true}
                                onChange={(e) => {
                                  updateResult(
                                    `comments${question.id}`,
                                    "comment",
                                    e.target.value
                                  );
                                }}
                              ></textarea>
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    }

                  {question.question_type === "number" && (
                    <React.Fragment>
                      <div className="generic-form">
                        <h5>{question.value}</h5>
                        <Input
                          type="number"
                          placeholder={"Answer"}
                          value={
                            surveyResult[`answer_number${question.id}`] ?
                            surveyResult[`answer_number${question.id}`][0]: ''
                          }
                          onChange={(e) => {
                            updateResult(
                              `answer_number${question.id}`,
                              "number",
                              e.target.value,
                              question.id
                            );
                          }}
                        />
                        {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, surveyResult[`answer_number${question.id}`] !== undefined ? true : null, 'required')}
                        {Number(question.enable_comments) === 1 && (
                          <div className="generic-form">
                            <p>Your comment:</p>
                            <textarea
                              placeholder="Your comment"
                              cols={30}
                              rows={5}
                              disabled={surveyResult[`answer_number${question.id}`] !== undefined ? false : true}
                              onChange={(e) => {
                                updateResult(
                                  `comments${question.id}`,
                                  "comment",
                                  e.target.value
                                );
                              }}
                            ></textarea>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )}

                  {question.question_type === "open" && (
                    <React.Fragment>
                      <div className="generic-form">
                        <h5>{question.value}</h5>
                        <textarea
                          placeholder="Answer"
                          value={
                            surveyResult[`answer_open${question.id}`] &&
                            surveyResult[`answer_open${question.id}`][0]
                          }
                          onChange={(e) => {
                            updateResult(
                              `answer_open${question.id}`,
                              "open",
                              e.target.value,
                              question.id
                            );
                          }}
                          cols={30}
                          rows={10}
                        ></textarea>
                        {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, surveyResult[`answer_open${question.id}`] !== undefined ? true : null, 'required')}
                        {Number(question.enable_comments) === 1 && (
                          <div className="generic-form">
                            <p>Your comment:</p>
                            <textarea
                              placeholder="Your comment"
                              cols={30}
                              rows={5}
                              disabled={surveyResult[`answer_open${question.id}`] !== undefined ? false : true}
                              onChange={(e) => {
                                updateResult(
                                  `comments${question.id}`,
                                  "comment",
                                  e.target.value
                                );
                              }}
                            ></textarea>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )}

                  {question.question_type === "dropdown" && (
                      <React.Fragment>
                        <div className="generic-form">
                          <h5>{question.value}</h5>
                          <div
                            className="custom-label-select"
                            style={{ width: "46%" }}
                          >
                            <Select
                              placeholder="Select value from dropdown"
                              components={{ IndicatorSeparator: null }}
                              options={question.answer.map((answer, i) => ({
                                label: answer.answer,
                                value: answer.id,
                                key: i,
                              }))}
                              
                              value={surveyResult[`answer_dropdown${question.id}`] !== undefined && { label:  question.answer.find((answer) => ( answer.id == surveyResult[`answer_dropdown${question.id}`][0] )).answer , value: surveyResult[`answer_dropdown${question.id}`][0] }}
                              onChange={(item) => {
                                  updateResult(
                                      `answer_dropdown${question.id}`,
                                      "dropdown",
                                      item,
                                      question.id
                                      );
                              }}
                            />
                          </div>
                          {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, surveyResult[`answer_dropdown${question.id}`] !== undefined ? true : null, 'required')}
                          {Number(question.enable_comments) === 1 && (
                            <div className="generic-form">
                              <p>Your comment:</p>
                              <textarea
                                placeholder="Your comment"
                                cols={30}
                                rows={5}
                                disabled={surveyResult[`answer_dropdown${question.id}`] !== undefined ? false : true}
                                onChange={(e) => {
                                  updateResult(
                                    `comments${question.id}`,
                                    "comment",
                                    e.target.value
                                  );
                                }}
                              ></textarea>
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    )}

                  {question.question_type === "date" && (
                    <React.Fragment>
                      <div className="generic-form" style={{ width: "46%" }}>
                        <h5>{question.value}</h5>
                        <DateTime
                          onChange={(item) => {
                            updateResult(
                              `answer_date${question.id}`,
                              "date",
                              item.format("YYYY-MM-DD"),
                              question.id
                            );
                            
                          }}
                          value={
                            surveyResult[`answer_date${question.id}`] &&
                            surveyResult[`answer_date${question.id}`][0]
                          }
                          label={`Select date`}
                          showdate={"YYYY-MM-DD"}
                        />
                        {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, surveyResult[`answer_date${question.id}`] !== undefined ? true : null, 'required')}
                        {Number(question.enable_comments) === 1 && (
                          <div className="generic-form">
                            <p>Your comment:</p>
                            <textarea
                              placeholder="Your comment"
                              cols={30}
                              rows={5}
                              disabled={surveyResult[`answer_date${question.id}`] !== undefined ? false : true}
                              onChange={(e) => {
                                updateResult(
                                  `comments${question.id}`,
                                  "comment",
                                  e.target.value
                                );
                              }}
                            ></textarea>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )}

                  {question.question_type === "date_time" && (
                    <React.Fragment>
                      <div className="generic-form" style={{ width: "46%" }}>
                        <h5>{question.value}</h5>
                        <DateTime
                          onChange={(item) => {
                            updateResult(
                              `answer_date_time${question.id}`,
                              "date_time",
                              item.format("YYYY-MM-DD HH:mm:ss"),
                              question.id
                            );
                          }}
                          value={
                            surveyResult[`answer_date_time${question.id}`] ?
                            surveyResult[`answer_date_time${question.id}`][0]: ''
                          }
                          label={`Select date time`}
                          showdate={"YYYY-MM-DD"}
                          showtime={"HH:mm:ss"}
                        />
                          {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, surveyResult[`answer_date_time${question.id}`] !== undefined ? true : null, 'required')}
                        {Number(question.enable_comments) === 1 && (
                          <div className="generic-form">
                            <p>Your comment:</p>
                            <textarea
                              placeholder="Your comment"
                              cols={30}
                              rows={5}
                              disabled={surveyResult[`answer_date_time${question.id}`] !== undefined ? false : true}
                              onChange={(e) => {
                                updateResult(
                                  `comments${question.id}`,
                                  "comment",
                                  e.target.value
                                );
                              }}
                            ></textarea>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )}

                  {question.question_type === "single" && (
                      <React.Fragment>
                        <div className="radio-check-field style-radio">
                          <h5>{question.value}</h5>
                          {question.answer.map((answer) => (
                            <label
                              key={answer.id}
                              onClick={() => {
                                updateResult(
                                  `answer${question.id}`,
                                  "single",
                                  answer.id,
                                  question.id,
                                );
                              }}
                              className={
                                surveyResult[`answer${question.id}`] !==
                                  undefined &&
                                surveyResult[`answer${question.id}`].indexOf(
                                  answer.id
                                ) !== -1
                                  ? "checked"
                                  : ""
                              }
                            >
                              <span>{answer.answer}</span>
                            </label>
                          ))}
                          {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, surveyResult[`answer${question.id}`] !== undefined ? true : null, 'required')}
                          {Number(question.enable_comments) === 1 && (
                            <div className="generic-form">
                              <p>Your comment:</p>
                              <textarea
                                placeholder="Your comment"
                                cols={30}
                                rows={5}
                                disabled={surveyResult[`answer${question.id}`] !== undefined ? false : true}
                              ></textarea>
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    )}

                  {question.question_type === "matrix" && (
                      <React.Fragment>
                        <div className={`matrix-question-wrapper`}>
                          <h5>{question.value}</h5>
                          <div className="matrix-table">
                            <div className="martix-row matrix-header">
                              <div className="matrix-box matrix-heading"></div>
                              {question.matrix.map((matrix) => (
                                <div key={matrix.id} className="matrix-box">
                                  {matrix.name}
                                </div>
                              ))}
                            </div>
                            {question.answer.map((answer) => (
                              <React.Fragment key={answer.id}>
                                <div className="martix-row">
                                  <div className="matrix-box matrix-heading">
                                    {answer.answer}
                                  </div>
                                  {question.matrix.map((matrix) => (
                                    <React.Fragment key={matrix.id}>
                                      <div className="matrix-box">
                                        <label className="label-radio">
                                          <input
                                            checked={
                                              surveyResult[
                                                `answer_matrix${question.id}_${answer.id}`
                                              ] !== undefined &&
                                              surveyResult[
                                                `answer_matrix${question.id}_${answer.id}`
                                              ][0].indexOf(matrix.id) !== -1
                                                ? true
                                                : false
                                            }
                                            type="radio"
                                            onChange={() => {
                                              updateResult(
                                                `answer${question.id}`,
                                                "matrix",
                                                answer.id,
                                                question.id,
                                                answer.link_to,
                                                matrix.id
                                              );
                                            }}
                                          />
                                          <span></span>
                                        </label>
                                      </div>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </React.Fragment>
                            ))}
                          </div>
                          {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, surveyResult[`answer${question.id}`] !== undefined && surveyResult[`answer${question.id}`].length === question.answer.length ? true : null, 'required')}
                          {Number(question.enable_comments) === 1 && (
                            <div className="generic-form">
                              <p>Your comment:</p>
                              <textarea
                                placeholder="Your comment"
                                cols={30}
                                rows={5}
                                disabled={surveyResult[`answer${question.id}`] !== undefined ? false : true}
                                onChange={(e) => {
                                  updateResult(
                                    `comments${question.id}`,
                                    "comment",
                                    e.target.value
                                  );
                                }}
                              ></textarea>
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    )}
                  <div className="ebs-seperator" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </React.Fragment>
      </div>
      <button className="btn btn-primary btn-loader" onClick={(e)=>{handleSave(e)}}> Save </button>
    </React.Fragment>
  );
};

export default SurveyForm;
