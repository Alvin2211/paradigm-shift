import React from "react";
import { useNavigate } from "react-router-dom";

const CareerResults = ({ careers, ats,onReset }) => {
  const navigate = useNavigate();

  if (!careers || !Array.isArray(careers)) {
    return (
      <div className="relative z-10 mt-10 px-15 pb-15 flex flex-col items-center justify-center">
        <h3 className="text-white text-center mt-10">
          We faced a problem generating response, please contact support :)
        </h3>
      </div>
    );
  }

  return (
    <div className="relative z-10 mt-10 px-15 pb-15 flex flex-col items-center justify-center">

      {ats && (
        <div className=" mb-10 bg-black/50 backdrop-blur-md rounded-xl p-6 shadow-[0px_0px_8px_2px_#7c7cff] ">
          
          <h2 className="text-2xl font-bold text-white text-center mb-5">
            ATS Score Analysis
          </h2>

          <div className="flex justify-center mb-5">
            <div className="w-32 h-32 rounded-full border-4 border-[#7c7cff] flex items-center justify-center text-white text-3xl font-semibold p-2 shadow-[0_0_10px_#7c7cff]">
              {ats.ats_score}/100
            </div>
          </div>

          {ats.strengths?.length > 0 && (
            <div className="mb-3">
              <h4 className="text-[#7c7cff] font-semibold">Strengths</h4>
              <ul className="list-disc ml-5 text-neutral-200 text-sm">
                {ats.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {ats.errors?.length > 0 && (
            <div className="mb-3">
              <h4 className="text-[#7c7cff] font-semibold">Issues</h4>
              <ul className="list-disc ml-5 text-neutral-200 text-sm">
                {ats.errors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          )}

          
          {ats.improvements?.length > 0 && (
            <div>
              <h4 className="text-[#7c7cff] font-semibold">Improvements</h4>
              <ul className="list-disc ml-5 text-neutral-200 text-sm">
                {ats.improvements.map((imp, i) => <li key={i}>{imp}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      <h2 className="text-3xl font-bold text-white text-center mb-8">
        Suggested Career Paths
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {careers.map((career, i) => (
          <div
            key={i}
            className="bg-black/50 backdrop-blur-md rounded-xl p-6 shadow-[0px_0px_8px_2px_#7c7cff] hover:scale-105 transition-transform duration-500"
          >
            <h3 className="text-xl font-bold text-[#7c7cff]">
              {career.career_title} ({career.designation})
            </h3>

            <p className="mt-2 text-neutral-200 text-sm">
              {career.career_description}
            </p>

            {career.required_skills?.length > 0 && (
              <div className="mt-3">
                <h4 className="font-semibold text-[#7c7cff]">Required Skills:</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {career.required_skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 text-xs bg-white text-[#7c7cff] rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {career.global_demand && (
              <p className="mt-3 text-sm text-[#7c7cff] italic">
                <strong>Global Demand:</strong>{" "}
                <span className="text-neutral-200">{career.global_demand}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        className="mt-10 px-5 py-3 bg-[#7c7cff] text-white font-semibold rounded-full shadow-md shadow-indigo-500/50 hover:scale-105 transition-transform duration-200"
        onClick={onReset}
      >
        Try Another Resume
      </button>
    </div>
  );
};

export default CareerResults;