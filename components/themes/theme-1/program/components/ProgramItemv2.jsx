import React, { useState } from "react";
import moment from "moment";
import ActiveLink from "components/atoms/ActiveLink";
import ProgramV2Popup from "components/ui-components/ProgramV2Popup";
import Image from "next/image";

const ProgramItemv2 = ({ program, eventUrl, labels, agendaSettings }) => {
  const [popup, setPopup] = useState(false);
  const _ref = React.useRef();
  return (
    <>
      {popup && (
        <ProgramV2Popup onClick={() => setPopup(false)} data={program} />
      )}
      <div className="ebs-program-child">
        <div className="row d-flex align-items-start">
          <div className="col-lg-2">
            {parseInt(agendaSettings.agenda_display_time) === 1 &&
              parseInt(program.hide_time) === 0 && (
                <div className="ebs-program-date pt-1 m-0">
                  {moment(`${program.date} ${program.start_time}`).format(
                    "HH:mm"
                  )}{" "}
                  -{" "}
                  {moment(`${program.date} ${program.end_time}`).format(
                    "HH:mm"
                  )}
                </div>
              )}
          </div>
          {program?.program_speakers?.length > 0 && (
            <div className="col-lg-2  d-flex align-items-lg-center gap-3 flex-column justify-content-start flex-lg-row">
              <div className="d-flex gap-3 align-items-center justify-content-start flex-wrap">
                {program?.program_speakers?.slice(0, 1).map((speakers, o) => (
                  <ActiveLink
                    href={`/${eventUrl}/speakers/${speakers.id}`}
                    key={o}
                    className="d-flex align-items-center gap-12"
                  >
                    <figure
                      className="m-0"
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      {speakers?.image && speakers.image !== "" ? (
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                          }}
                          onLoad={(e) => (e.target.style.opacity = 1)}
                          src={
                            process.env.NEXT_APP_EVENTCENTER_URL +
                            "/assets/attendees/" +
                            speakers.image
                          }
                          alt=""
                        />
                      ) : (
                        <Image
                          onLoad={(e) => (e.target.style.opacity = 1)}
                          width={"100%"}
                          objectFit="cover"
                          height={"100%"}
                          src={require("public/img/user-placeholder.jpg")}
                          alt=""
                        />
                      )}
                    </figure>

                    <h6 className="fs-small fw-normal m-0">
                      {speakers.first_name} {speakers.last_name}
                    </h6>
                  </ActiveLink>
                ))}
              </div>

            </div>
          )}
          <div className="col-lg-8">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setPopup(true)}
              ref={_ref}
              className="ebs-program-content"
            >
              {program.topic && <h3 className="fix-text">{program.topic}</h3>}
              <div className="d-flex align-items-center">
                {program.location && (
                  <div className="ebs-program-location pb-2 me-4 d-flex">
                    <span class="material-icons text-primary align-middle me-2">
                      location_on
                    </span>
                  <p className="fix-text"> {program.location}</p>
                  </div>
                )}
                {program.program_tracks.length > 0 && (
                  <div className="ebs-tracks-program d-flex align-items-center pb-2 gap-2">
                    {program.program_tracks.slice(0, 3).map((track, i) => (
                      <span
                      className="p-0 m-0 me-2"
                      key={i}
                      data-title={track.name}
                        style={{
                          width: 16,
                          height: 16,
                          padding: 0,
                          backgroundColor: `${
                            track.color ? track.color : "#000"
                          }`,
                        }}
                      ></span>
                    ))}
                    {program.program_tracks.length > 3 && (
                      <div className="p-0 m-0 me-2 text-default">
                        +{program.program_tracks.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramItemv2;
