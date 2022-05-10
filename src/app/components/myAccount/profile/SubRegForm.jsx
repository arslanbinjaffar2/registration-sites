import React, { useState, useRef } from "react";
import Input from "@/forms/Input";
import TextArea from "@/forms/TextArea";
import DateTime from "@/forms/DateTime";
import Select from "react-select";
import SimpleReactValidator from "simple-react-validator";
import {
  updateSubRegistrationData,
} from "store/Slices/myAccount/subRegistrationSlice";
import { useSelector, useDispatch } from "react-redux";
const SubRegForm = ({ subRegistration, eventUrl, afterLogin }) => {
  const dispatch = useDispatch();
  const [subRegResult, setSubRegResult] = useState(afterLogin ? {} : subRegistration.questions.question
    .reduce(
      (ack, item) => {
      if(item.question_type === "multiple"){
        let newObj ={ [`answer${item.id}`]: item.result.map(item=>(item.answer_id)) }
        let agendas = item.answer.filter((filterItem)=>(filterItem.link_to > 0)).reduce((ack, ritem) => {
          if(item.result.map(item=>(item.answer_id)).indexOf(ritem) !== -1){
           return Object.assign(ack, { [`answer_agenda_${ritem.id}`] : ritem.link_to })
          }
          return ack;          
          },
        {})
        if(Object.keys(agendas).length > 0){
          newObj ={...newObj,...agendas};
        }
        return Object.assign(ack, {...newObj} );
      }
      else if(item.question_type === "single"){
        let newObj ={ [`answer${item.id}`]: [item.result[0].answer_id] }
        if(item.answer.find((answer)=>(item.result[0].answer_id === answer.id)).link_to > 0){
          newObj ={...newObj,[`answer_agenda_${item.answer_id}`] : item.answer[item.result[0].answer_id].link_to};
        }
        return Object.assign(ack, {...newObj} );
      }
      else if(item.question_type === "dropdown"){
        let newObj ={ [`answer_dropdown${item.id}`]: [`${item.result[0].answer_id}-${item.answer.find((answer)=>(item.result[0].answer_id === answer.id)).link_to}`] }
        return Object.assign(ack, {...newObj} );
      }
      else if(item.question_type === "matrix"){
        let newObj ={ [`answer${item.id}`]: item.result.map((anwser)=>(anwser.answer_id)) }
        let matrix = item.result.reduce((ack, ritem) => {
           return Object.assign(ack, { [`answer_matrix${item.id}_${ritem.answer_id}`] : [`${ritem.answer_id}-${ritem.answer}`] })},
          
        {})
        return Object.assign(ack, {...newObj, ...matrix} );
      }
      else{
        return Object.assign(ack, { [`answer_${item.question_type}${item.id}`]: [item.result[0].answer]} );
      }
    },{}));
  const [subRegId] = useState(subRegistration.questions.id);
  const [questions] = useState(
    subRegistration.questions.question
  );
  const [optionals] = useState(
    subRegistration.questions.question
      .filter((item) => item.required_question !== "1")
      .map((item) => item.id)
  );
  const [questionsType] = useState(
    subRegistration.questions.question.reduce(
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
      if (Object.keys(subRegResult).length > 0) {
        console.log(subRegResult[feild]);
        let newObj = subRegResult;
        newObj[feild]=
        subRegResult[feild]
          ? (subRegResult[feild].indexOf(answerId) !== -1
            ? subRegResult[feild].filter((item) => (item !== answerId))
            : [...subRegResult[feild], answerId])
          : [answerId];
        // console.log(newObj);
          
        if (agendaId !== 0) {
            newObj[`answer_agenda_${answerId}`] = agendaId;
        }
        setSubRegResult({ ...newObj });
        console.log(subRegResult);
      } else {
        let newObj = {
          [feild]: [answerId],
        };
        if (agendaId !== 0) {
            newObj[`answer_agenda_${answerId}`] = agendaId;
        }
        setSubRegResult({ ...newObj });
      }
    }
    else if (type === "dropdown") {
      Object.keys(subRegResult).length > 0
        ? setSubRegResult({
            ...subRegResult,
            [feild]: [`${answerId.value}-${answerId.linkTo}`],
          })
        : setSubRegResult({
            [feild]: [`${answerId.value}-${answerId.linkTo}`],
          });
    }
    else if (type === "single") {
      if (Object.keys(subRegResult).length > 0) {
        let newObj = {
          [feild]: [answerId],
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
   else if (type === "matrix") {
      if (Object.keys(subRegResult).length > 0) {
        console.log(feild);
        setSubRegResult({
          ...subRegResult,
          [feild]:
            subRegResult[feild] !== undefined
              ? subRegResult[feild].indexOf(answerId) !== -1  
                ? subRegResult[feild]
                : [...subRegResult[feild], answerId]
              : [answerId],
          [`answer_matrix${questionId}_${answerId}`]: [
            `${answerId}-${matrixId}`,
          ],
        });
      } else {
        setSubRegResult({
          [feild]: [answerId],
          [`answer_matrix${questionId}_${answerId}`]: [
            `${answerId}-${matrixId}`,
          ],
        });
      }
    } else {
      Object.keys(subRegResult).length > 0
        ? setSubRegResult({ ...subRegResult, [feild]: [answerId] })
        : setSubRegResult({ [feild]: [answerId] });
    }
  };



  const handleSave =(e) =>{
    const formValid = simpleValidator.current.allValid()
    if (!formValid) {
      simpleValidator.current.showMessages()
    }else{
      if(afterLogin){
        dispatch(updateSubRegistrationData(eventUrl, {
            first_time:"yes",
            sub_reg_id: subRegId,
            optionals,
            questionsType,
            questions:questions.reduce((ack, item) => { return ack.concat(item.id)},[]),
            ...subRegResult,
          }))
      }
      else{
        dispatch(updateSubRegistrationData(eventUrl, {
          first_time:"no",
          sub_reg_id: subRegId,
          optionals,
          questionsType,
          questions:questions.reduce((ack, item) => { return ack.concat(item.id)},[]),
          ...subRegResult,
        }))
      }
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
                    (afterLogin ? question.display_question === "yes" : true) && (
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
                                  undefined &&
                                subRegResult[`answer${question.id}`].indexOf(
                                  answer.id
                                ) !== -1
                                  ? "checked"
                                  : ""
                              }
                            >
                              <span>{answer.info[0].value}</span>
                            </label>
                          ))}
                          {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, subRegResult[`answer${question.id}`] !== undefined ? true : null, 'required')}
                          {Number(question.enable_comments) === 1 && (
                            <div className="generic-form">
                              <p>Your comment:</p>
                              <textarea
                                placeholder="Your comment"
                                cols={30}
                                rows={5}
                                disabled={subRegResult[`answer${question.id}`] !== undefined ? false : true}
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

                  {question.question_type === "number" && (
                    <React.Fragment>
                      <div className="generic-form">
                        <h5>{question.info[0].value}</h5>
                        <Input
                          type="number"
                          placeholder={"Answer"}
                          value={
                            subRegResult[`answer_number${question.id}`] ?
                            subRegResult[`answer_number${question.id}`][0]: ''
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
                        {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, subRegResult[`answer_number${question.id}`] !== undefined ? true : null, 'required')}
                        {Number(question.enable_comments) === 1 && (
                          <div className="generic-form">
                            <p>Your comment:</p>
                            <textarea
                              placeholder="Your comment"
                              cols={30}
                              rows={5}
                              disabled={subRegResult[`answer_number${question.id}`] !== undefined ? false : true}
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
                        <h5>{question.info[0].value}</h5>
                        <textarea
                          placeholder="Answer"
                          value={
                            subRegResult[`answer_open${question.id}`] &&
                            subRegResult[`answer_open${question.id}`][0]
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
                        {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, subRegResult[`answer_open${question.id}`] !== undefined ? true : null, 'required')}
                        {Number(question.enable_comments) === 1 && (
                          <div className="generic-form">
                            <p>Your comment:</p>
                            <textarea
                              placeholder="Your comment"
                              cols={30}
                              rows={5}
                              disabled={subRegResult[`answer_open${question.id}`] !== undefined ? false : true}
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

                  {question.question_type === "dropdown" &&
                    (afterLogin ? question.display_question === "yes" : true) && (
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
                              
                              value={subRegResult[`answer_dropdown${question.id}`] !== undefined && { label:  question.answer.find((answer) => ( answer.id == subRegResult[`answer_dropdown${question.id}`][0].split('-')[0] )).info[0].value , value: subRegResult[`answer_dropdown${question.id}`][0].split('-')[0] }}
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
                          {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, subRegResult[`answer_dropdown${question.id}`] !== undefined ? true : null, 'required')}
                          {Number(question.enable_comments) === 1 && (
                            <div className="generic-form">
                              <p>Your comment:</p>
                              <textarea
                                placeholder="Your comment"
                                cols={30}
                                rows={5}
                                disabled={subRegResult[`answer_dropdown${question.id}`] !== undefined ? false : true}
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
                        <h5>{question.info[0].value}</h5>
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
                            subRegResult[`answer_date${question.id}`] &&
                            subRegResult[`answer_date${question.id}`][0]
                          }
                          label={`Select date`}
                          showdate={"YYYY-MM-DD"}
                        />
                        {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, subRegResult[`answer_date${question.id}`] !== undefined ? true : null, 'required')}
                        {Number(question.enable_comments) === 1 && (
                          <div className="generic-form">
                            <p>Your comment:</p>
                            <textarea
                              placeholder="Your comment"
                              cols={30}
                              rows={5}
                              disabled={subRegResult[`answer_date${question.id}`] !== undefined ? false : true}
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
                        <h5>{question.info[0].value}</h5>
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
                            subRegResult[`answer_date_time${question.id}`] ?
                            subRegResult[`answer_date_time${question.id}`][0]: ''
                          }
                          label={`Select date time`}
                          showdate={"YYYY-MM-DD"}
                          showtime={"HH:mm:ss"}
                        />
                          {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, subRegResult[`answer_date_time${question.id}`] !== undefined ? true : null, 'required')}
                        {Number(question.enable_comments) === 1 && (
                          <div className="generic-form">
                            <p>Your comment:</p>
                            <textarea
                              placeholder="Your comment"
                              cols={30}
                              rows={5}
                              disabled={subRegResult[`answer_date_time${question.id}`] !== undefined ? false : true}
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

                  {question.question_type === "single" &&
                    (afterLogin ? question.display_question === "yes" : true) && (
                      <React.Fragment>
                        <div className="radio-check-field style-radio">
                          <h5>{question.info[0].value}</h5>
                          {question.answer.map((answer) => (
                            <label
                              key={answer.id}
                              onClick={() => {
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
                                  undefined &&
                                subRegResult[`answer${question.id}`].indexOf(
                                  answer.id
                                ) !== -1
                                  ? "checked"
                                  : ""
                              }
                            >
                              <span>{answer.info[0].value}</span>
                            </label>
                          ))}
                          {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, subRegResult[`answer${question.id}`] !== undefined ? true : null, 'required')}
                          {Number(question.enable_comments) === 1 && (
                            <div className="generic-form">
                              <p>Your comment:</p>
                              <textarea
                                placeholder="Your comment"
                                cols={30}
                                rows={5}
                                disabled={subRegResult[`answer${question.id}`] !== undefined ? false : true}
                              ></textarea>
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    )}

                  {question.question_type === "matrix" &&
                    (afterLogin ? question.display_question === "yes" : true) && (
                      <React.Fragment>
                        <div className={`matrix-question-wrapper`}>
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
                                        <label className="label-radio">
                                          <input
                                            checked={
                                              subRegResult[
                                                `answer_matrix${question.id}_${answer.id}`
                                              ] !== undefined &&
                                              subRegResult[
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
                          {Number(question.required_question) === 1 && simpleValidator.current.message(`${question.question_type}-${question.id}`, subRegResult[`answer${question.id}`] !== undefined && subRegResult[`answer${question.id}`].length === question.answer.length ? true : null, 'required')}
                          {Number(question.enable_comments) === 1 && (
                            <div className="generic-form">
                              <p>Your comment:</p>
                              <textarea
                                placeholder="Your comment"
                                cols={30}
                                rows={5}
                                disabled={subRegResult[`answer${question.id}`] !== undefined ? false : true}
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

export default SubRegForm;
