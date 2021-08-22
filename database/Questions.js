const questions = [
    {
        question: "Kto wygrał ligę mistrzów w 2005?",
        answers: [
          {
            content: "Jerzy Owsiak",
            isCorrect: "false",
          },
          {
            content: "Jerzy Kryszak",
            isCorrect: "false",
          },
          {
            content: "Jerzy Dudek",
            isCorrect: "true",
          },
          {
            content: "Jerzy Urban",
            isCorrect: "false",
          }
        ],
        duration: 30
      },
      {
        question: "Kto zdobył kryształową kulę?",
        answers: [
          {
            content: "Adam Sandler",
            isCorrect: "false",
          },
          {
            content: "Adam Małysz",
            isCorrect: "true",
          },
          {
            content: "Adam Nawałka",
            isCorrect: "false",
          },
          {
            content: "Adam Mickiewicz",
            isCorrect: "false",
          }
        ],
        duration: 30
      },
      {
        question: "W jakim mieście można spotkać Smoka Wawelskiego?",
        answers: [
          {
            content: "Warszawie",
            isCorrect: "false",
          },
          {
            content: "Rzeszowie",
            isCorrect: "false",
          },
          {
            content: "Katowicach",
            isCorrect: "false",
          },
          {
            content: "Krakowie",
            isCorrect: "true",
          }
        ],
        duration: 30
      }
]

export const getQuestions = () => {
    return questions;
}