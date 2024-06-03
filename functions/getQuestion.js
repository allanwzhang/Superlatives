import { getDatabase, ref, onValue, update } from "firebase/database";

export const getQuestion = (code) => {
  const db = getDatabase();
  const resultsRef = ref(db, `games/${code}/results`);
  const questionRef = ref(db, "questions");

  let prevQs = [];

  // Fetch previously asked questions
  onValue(resultsRef, (snapshot) => {
    const prev = snapshot.val();
    if (prev) {
      Object.entries(prev).forEach(([key, value]) => {
        prevQs.push(value.question);
      });
    }

    // Fetch the array of all questions
    onValue(questionRef, (snapshot) => {
      const questions = snapshot.val();

      if (questions && Array.isArray(questions)) {
        let randomQ;

        // Keep sampling questions until one is not in prevQs
        do {
          const randomIndex = Math.floor(Math.random() * questions.length);
          randomQ = questions[randomIndex];
        } while (prevQs.includes(randomQ));

        // Update the current question in the game
        const gameRef = ref(db, `games/${code}`);
        update(gameRef, { currentQuestion: randomQ });
      }
    }, { onlyOnce: true });
  }, { onlyOnce: true });
};
