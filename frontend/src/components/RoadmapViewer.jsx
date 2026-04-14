import { useState } from "react";

function DetailPanel({ topic, onClose }) {
  return (
    <div className="bg-neutral-200 hover:bg-neutral-100 border border-gray-200 rounded-xl p-5 transition-colors duration-150">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 pr-3">
          <p className="text-xs font-medium text-[#7c7cff] uppercase tracking-widest mb-1">
            Step {topic.id + 1} · {topic.subtopics.length} subtopics
          </p>
          <p className="text-base font-medium text-neutral-800 mb-1.5">{topic.title}</p>
          <p className="text-sm text-neutral-800 leading-relaxed">{topic.description}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close detail panel"
          className="flex-shrink-0 w-7 h-7 rounded-full border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-white text-sm cursor-pointer transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="border-t border-gray-900 pt-1">
        {topic.subtopics.map((sub, i) => (
          <div
            key={i}
            className={`py-3 ${i < topic.subtopics.length - 1 ? "border-b border-gray-900" : ""}`}
          >
            <p className="text-sm font-medium text-neutral-800 mb-1">{sub.title}</p>
            <p className="text-xs text-neutral-800 leading-relaxed">{sub.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopicNode({ topic, index, total, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div
      onClick={() => onClick(topic)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.18s ease" }}
      className={`relative z-10 flex items-center gap-4 mb-5 cursor-pointer ${isLeft ? "flex-row-reverse" : "flex-row"}`}
    >
      <div className="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-[#7c7cff] border-2 border-black outline outline-1 outline-neutral-50 z-20" />
      <div
        className={`flex-1 rounded-xl border p-3 transition-colors duration-150 ${
          hovered ? "bg-neutral-100 border-gray-400" : "bg-neutral-200 border-gray-200"
        }`}
      >
        <p className="text-xs font-medium text-violet-500 mb-0.5">
          Step {topic.id + 1} of {total}
        </p>
        <p className="text-sm font-medium text-gray-900 mb-1">{topic.title}</p>
        <p className="text-xs text-neutral-700 leading-relaxed">{topic.description}</p>
      </div>
    </div>
  );
}

export default function RoadmapViewer({ isResult }) {
  const [selectedTopic, setSelectedTopic] = useState(null);

  if (!isResult) return null;

  return (
    <div className="px-4 py-8 font-sans max-w-2xl mx-auto">

      <div className="text-center mb-10">
        <p className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-1.5">
          Learning path · {isResult.total_duration_days} days
        </p>
        <h1 className="text-2xl font-medium text-[#7c7cff] mb-2">{isResult.title}</h1>
        <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
          {isResult.description}
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {selectedTopic ? (
          <DetailPanel
            topic={selectedTopic}
            onClose={() => setSelectedTopic(null)}
          />
        ) : (
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gray-200 z-0" />
            {isResult.main_topics.map((topic, i) => (
              <TopicNode
                key={topic.id}
                topic={topic}
                index={i}
                total={isResult.main_topics.length}
                onClick={setSelectedTopic}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}