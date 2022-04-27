import React, { useState } from "react";
import Input from "@/forms/Input";
import TextArea from "@/forms/TextArea";
import DateTime from "@/forms/DateTime";
import Select from "react-select";

const SubRegForm = ({ subRegistration }) => {
  const [subRegResult, setSubRegResult] = useState({});
  const [subRegId, setSubRegId] = useState(subRegistration.questions.id);
  const [questions, setQuestions] = useState(
    subRegistration.questions.question
  );
  const [optionals, setOptionals] = useState(
    subRegistration.questions.question
      .filter((item) => item.required_question !== "1")
      .map((item) => item.id)
  );
  const [questionsType, setQuestionsType] = useState(
    subRegistration.questions.question.reduce(
      (ack, item) => Object.assign(ack, { [item.id]: item.question_type }),
      {}
    )
  );
  const updateResult = (
    feild,
    type,
    answerId = 0,
    questionId,
    agendaId = 0,
    matrixId = 0,
  ) => {
    if (type === "multiple") {
        if (subRegResult !== undefined) {
            let newObj = {
                [feild]:
                subRegResult[feild] !== undefined ? (subRegResult[feild].indexOf(answerId) !== -1
                ? subRegResult[feild].filter((item) => (item !== answerId))
                : [...subRegResult[feild], answerId]) : [answerId],
            };
            if (agendaId !== 0) {
                if (subRegResult[`answer_agenda_${answerId}`] === undefined) {
                    newObj[`answer_agenda_${answerId}`] = agendaId;
                }
            }
            setSubRegResult({ ...subRegResult, ...newObj });
        } else {
            let newObj = {
                [feild]:
                subRegResult[feild] !== undefined ? (subRegResult[feild].indexOf(answerId) !== -1
                ? subRegResult[feild].filter((item) => (item !== answerId))
                : [...subRegResult[feild], answerId]) : [answerId],
            };
            if (agendaId !== 0) {
                if (subRegResult[`answer_agenda_${answerId}`] === undefined) {
                    newObj[`answer_agenda_${answerId}`] = agendaId;
                }
            }
            setSubRegResult({ ...newObj });
      }
    }
    if(type === "open"){
        console.log(answerId)
        subRegResult !== undefined ? setSubRegResult({...subRegResult, [feild]:[answerId]}) : setSubRegResult({[feild]:[answerId]})
    }   
    if(type === "number"){
        subRegResult !== undefined ? setSubRegResult({...subRegResult, [feild]:[answerId]}) : setSubRegResult({[feild]:[answerId]})
    }   
    if(type === "date"){
        subRegResult !== undefined ? setSubRegResult({...subRegResult, [feild]:[answerId]}) : setSubRegResult({[feild]:[answerId]})
    }   
    if(type === "dropdown"){
        subRegResult !== undefined ? setSubRegResult({...subRegResult, [feild]:[`${answerId.value}-${answerId.linkTo}`]}) : setSubRegResult({[feild]:[`${answerId.value}-${answerId.linkTo}`]})
    }   
    if (type === "single") {
        if (subRegResult !== undefined) {
            let newObj = {
                [feild]:[answerId],
            };
            if (agendaId !== 0) {
                if (subRegResult[`answer_agenda_${answerId}`] === undefined) {
                    newObj[`answer_agenda_${answerId}`] = agendaId;
                }
            }
            setSubRegResult({ ...subRegResult, ...newObj });
        } else {
            let newObj = {
                [feild]: [answerId],
            };
            if (agendaId !== 0) {
                if (subRegResult[`answer_agenda_${answerId}`] === undefined) {
                    newObj[`answer_agenda_${answerId}`] = agendaId;
                }
            }
            setSubRegResult({ ...newObj });
      }
    }
    if(type === "matrix"){
        if (subRegResult !== undefined) {
            console.log(feild);         
            setSubRegResult({
                 ...subRegResult, 
                [feild]:
                subRegResult[feild] !== undefined ? (subRegResult[feild].indexOf(answerId) !== -1 ? subRegResult[feild].filter((item) => (item !== answerId)) : [...subRegResult[feild], answerId] ) : [answerId],
                [`answer_matrix${questionId}_${answerId}`]: [`${answerId}-${matrixId}`]
            });
        } else { 
            console.log(answerId);          
            setSubRegResult({ 
                [feild] : [answerId],
                [`answer_matrix${questionId}_${answerId}`]: [`${answerId}-${matrixId}`]
            });
      }
    } 

  };
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
                    question.display_question == "yes" && (
                      <React.Fragment>
                        <div className="radio-check-field">
                          <h5>{question.info[0].value}</h5>
                          {question.answer.map((answer) => (
                            <label
                              key={answer.id}
                              onClick={() => {
                                updateResult(
                                  `answer${question.id}`,
                                  "multiple",
                                  answer.id,
                                  question.id,
                                  answer.link_to
                                );
                              }}
                              className={
                                subRegResult[`answer${question.id}`] !==
                                undefined && subRegResult[`answer${question.id}`].indexOf(answer.id) !== -1
                                  ? "checked"
                                  : ""
                              }
                            >
                              <span>{answer.info[0].value}</span>
                            </label>
                          ))}
                          {Number(question.enable_comments) === 1 && (
                            <div className="generic-form">
                              <p>Your comment:</p>
                              <textarea
                                placeholder="Your comment"
                                cols={30}
                                rows={5}
                              ></textarea>
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    )}

                  {question.question_type === "number" && (
                    <React.Fragment>
                      <div className="generic-form">
                        <h5>{question.info[0].value}</h5>
                        <Input type="number" placeholder={"Answer"} value={subRegResult[`answer_number${question.id}`] && subRegResult[`answer_number${question.id}`][0]}
                          onChange={(e)=>{ updateResult(`answer_number${question.id}`, "number", e.target.value, question.id)}} />
                        {Number(question.enable_comments) === 1 && (
                          <div className="generic-form">
                            <p>Your comment:</p>
                            <textarea
                              placeholder="Your comment"
                              cols={30}
                              rows={5}
                            ></textarea>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )}

                  {question.question_type === "open" && (
                    <React.Fragment>
                      <div className="generic-form">
                        <h5>{question.info[0].value}</h5>
                        <textarea
                          placeholder="Answer"
                          value={subRegResult[`answer_open${question.id}`] && subRegResult[`answer_open${question.id}`][0]}
                          onChange={(e)=>{ updateResult(`answer_open${question.id}`, "open", e.target.value, question.id)}}
                          cols={30}
                          rows={10}
                        ></textarea>

                        {Number(question.enable_comments) === 1 && (
                          <div className="generic-form">
                            <p>Your comment:</p>
                            <textarea
                              placeholder="Your comment"
                              cols={30}
                              rows={5}
                            ></textarea>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )}

                  {question.question_type === "dropdown" &&
                    question.display_question == "yes" && (
                      <React.Fragment>
                        <div className="generic-form">
                          <h5>{question.info[0].value}</h5>
                          <div
                            className="custom-label-select"
                            style={{ width: "46%" }}
                          >
                            <Select
                              placeholder="Select value from dropdown"
                              components={{ IndicatorSeparator: null }}
                              options={question.answer.map((answer, i) => ({
                                label: answer.info[0].value,
                                value: answer.id,
                                linkTo: answer.link_to,
                                key: i,
                              }))}
                              onChange={(item)=>{updateResult(`answer_dropdown${question.id}`, "dropdown", item, question.id)}}
                            />
                          </div>
                          {Number(question.enable_comments) === 1 && (
                            <div className="generic-form">
                              <p>Your comment:</p>
                              <textarea
                                placeholder="Your comment"
                                cols={30}
                                rows={5}
                              ></textarea>
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    )}

                  {question.question_type === "date" && (
                    <React.Fragment>
                      <div className="generic-form" style={{ width: "46%" }}>
                        <h5>{question.info[0].value}</h5>
                        <DateTime 
                            onChange={(item)=>{ updateResult(`answer_date${question.id}`, "date", item.format("YYYY-MM-DD"), question.id)}}
                            value={subRegResult[`answer_date${question.id}`] && subRegResult[`answer_date${question.id}`][0]}
                            label={`Select date`}
                            showdate={'YYYY-MM-DD'}
                        />

                        {Number(question.enable_comments) === 1 && (
                          <div className="generic-form">
                            <p>Your comment:</p>
                            <textarea
                              placeholder="Your comment"
                              cols={30}
                              rows={5}
                            ></textarea>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )}

                  {question.question_type === "date_time" && (
                    <React.Fragment>
                      <div className="generic-form" style={{ width: "46%" }}>
                        <h5>{question.info[0].value}</h5>
                        <DateTime 
                        onChange={(item)=>{ updateResult(`answer_date_time${question.id}`, "date_time", item.format("YYYY-MM-DD"), question.id)}}
                        label={`Select date time`}
                        showdate={'YYYY-MM-DD'}
                        showtime={"HH:mm:ss"} 
                        />
                        {Number(question.enable_comments) === 1 && (
                          <div className="generic-form">
                            <p>Your comment:</p>
                            <textarea
                              placeholder="Your comment"
                              cols={30}
                              rows={5}
                            ></textarea>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )}

                  {question.question_type === "single" &&
                    question.display_question == "yes" && (
                      <React.Fragment>
                        <div className="radio-check-field style-radio">
                          <h5>{question.info[0].value}</h5>
                          {question.answer.map((answer) => (
                            <label key={answer.id}  onClick={() => {
                                updateResult(
                                  `answer${question.id}`,
                                  "single",
                                  answer.id,
                                  question.id,
                                  answer.link_to
                                );
                              }}
                              className={
                                subRegResult[`answer${question.id}`] !==
                                undefined && subRegResult[`answer${question.id}`].indexOf(answer.id) !== -1
                                  ? "checked"
                                  : ""
                              } >
                              <span>{answer.info[0].value}</span>
                            </label>
                          ))}
                          {Number(question.enable_comments) === 1 && (
                            <div className="generic-form">
                              <p>Your comment:</p>
                              <textarea
                                placeholder="Your comment"
                                cols={30}
                                rows={5}
                              ></textarea>
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    )}

                  {question.question_type === "matrix" &&
                    question.display_question == "yes" && (
                      <React.Fragment>
                        <div
                          className={`matrix-question-wrapper`}
                        >
                          <h5>{question.info[0].value}</h5>
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
                                    {answer.info[0].value}
                                  </div>
                                  {question.matrix.map((matrix) => (
                                    <React.Fragment key={matrix.id}>
                                      <div className="matrix-box">
                                        <label className="label-radio"  >
                                          <input checked={subRegResult[`answer${question.id}`] !== undefined && subRegResult[`answer${question.id}`].indexOf(answer.id) !== -1 ? true : false} type="radio" onChange={() => {
                                            updateResult(
                                            `answer${question.id}`,
                                            "matrix",
                                            answer.id,
                                            question.id,
                                            answer.link_to,
                                            matrix.id
                                            );
                                            }}   />
                                          <span></span>
                                        </label>
                                      </div>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </React.Fragment>
                            ))}
                          </div>
                          {Number(question.enable_comments) === 1 && (
                            <div className="generic-form">
                              <p>Your comment:</p>
                              <textarea
                                placeholder="Your comment"
                                cols={30}
                                rows={5}
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
    </React.Fragment>
  );
};

export default SubRegForm;
