import React, { useState } from "react";

function AIStudyAssistant() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] =
    useState("");
  const [quiz, setQuiz] = useState(
    []
  );
  const [flashcards, setFlashcards] =
    useState([]);
  const [keyPoints, setKeyPoints] =
    useState([]);
  const [
    interviewQuestions,
    setInterviewQuestions,
  ] = useState([]);

  const generateStudyTools = () => {
    if (!notes.trim()) {
      alert(
        "Please enter your study notes!"
      );
      return;
    }

    // Sentence split
    const sentences =
      notes.split(". ");

    // Summary
    const shortSummary =
      sentences
        .slice(0, 2)
        .join(". ") + ".";

    setSummary(shortSummary);

    // Key Points
    const generatedKeyPoints =
      sentences
        .slice(0, 4)
        .map(
          (sentence) =>
            "• " + sentence
        );

    setKeyPoints(
      generatedKeyPoints
    );

    // Quiz
    const generatedQuiz = [
      `What is the main idea of this topic?`,
      `Explain this concept in simple words.`,
      `Why is this concept important?`,
    ];

    setQuiz(generatedQuiz);

    // Flashcards
    const words =
      notes.split(" ");

    const generatedFlashcards =
      words
        .slice(0, 5)
        .map((word) => ({
          question: `What is ${word}?`,
          answer: `Explain ${word} from your notes.`,
        }));

    setFlashcards(
      generatedFlashcards
    );

    // Interview Questions
    const generatedInterview =
      [
        `How would you explain this topic in an interview?`,
        `What are real-world uses of this concept?`,
        `What are common mistakes in this topic?`,
      ];

    setInterviewQuestions(
      generatedInterview
    );
  };

  return (
    <div className="ai-study-assistant">

      <h1>
        AI Study Assistant Pro
      </h1>

      {/* Notes */}
      <textarea
        placeholder="Paste your study notes here..."
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
      ></textarea>

      <button
        onClick={
          generateStudyTools
        }
      >
        Generate Study Tools
      </button>

      {/* Summary */}
      {summary && (
        <div className="ai-summary">
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}

      {/* Key Points */}
      {keyPoints.length > 0 && (
        <div className="ai-summary">
          <h2>Key Points</h2>

          {keyPoints.map(
            (point, index) => (
              <p key={index}>
                {point}
              </p>
            )
          )}
        </div>
      )}

      {/* Quiz */}
      {quiz.length > 0 && (
        <div className="ai-quiz">
          <h2>Quiz Questions</h2>

          <ul>
            {quiz.map(
              (
                question,
                index
              ) => (
                <li key={index}>
                  {question}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Flashcards */}
      {flashcards.length >
        0 && (
        <div className="ai-quiz">
          <h2>Flashcards</h2>

          {flashcards.map(
            (
              card,
              index
            ) => (
              <div
                key={index}
              >
                <p>
                  <strong>
                    Q:
                  </strong>{" "}
                  {
                    card.question
                  }
                </p>

                <p>
                  <strong>
                    A:
                  </strong>{" "}
                  {
                    card.answer
                  }
                </p>
              </div>
            )
          )}
        </div>
      )}

      {/* Interview */}
      {interviewQuestions.length >
        0 && (
        <div className="ai-quiz">
          <h2>
            Interview
            Questions
          </h2>

          <ul>
            {interviewQuestions.map(
              (
                question,
                index
              ) => (
                <li key={index}>
                  {question}
                </li>
              )
            )}
          </ul>
        </div>
      )}

    </div>
  );
}

export default AIStudyAssistant;