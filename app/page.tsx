'use client'
import Image from "next/image";
import { quiz } from "./(QuizzApp_Component)/QuestionsList";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slice } from "lucide-react";
export default function Home() {
  const [SliceIndex,setSliceIndex] = useState<number>(0)
  const [selectedAnswer,setSelectedAnswer] = useState<string>('')
  const [correctAnswer,setCorrectAnswer]  = useState<string>('')
  const [score,setScore] = useState<number>(0)
  const [Finished,setFinished] = useState<boolean>(false) 
  // const [isSelected,setIsSelected] = useState<boolean>(false)
  const handleSelectAnswer = (answer:string,correctAnswer:string) => {
    setSelectedAnswer(answer)
    setCorrectAnswer(correctAnswer)
  }
  const handleNextButton = () => {
    if(selectedAnswer === correctAnswer) {
      setSliceIndex(SliceIndex + 1)
      setSelectedAnswer('')
      setCorrectAnswer('')
      setScore(prev => prev + 5)
    }else{
      setSliceIndex(SliceIndex + 1)
      setSelectedAnswer('')
      setCorrectAnswer('')
      setScore(score !== 0 ? prev => prev - 2 : 0)
    }
  }
  const handleSubmitButton =() => {
    if(selectedAnswer === correctAnswer) {
      setSliceIndex(SliceIndex + 1)
      setSelectedAnswer('')
      setCorrectAnswer('')
      setScore(prev => prev + 5)
    }else{
      setSliceIndex(SliceIndex + 1)
      setSelectedAnswer('')
      setCorrectAnswer('')
      setScore(score !== 0 ? prev => prev - 2 : 0)
    }
    setFinished(true)

  }

  const handleReset =() => {
    setSliceIndex(0)
    setSelectedAnswer('')
    setCorrectAnswer('')
    setScore(0)
    setFinished(false)
  }
  return (
    <main className="flex min-h-screen bg-black flex-col items-center justify-center p-24">
      <div className="bg-white w-[700px] h-[600px] rounded-xl flex flex-col items-center p-3">
        {Finished && <h1 className="text-2xl font-medium">Your score is {score}</h1>}
        {!Finished && (
          <>
                    <h1 className="text-2xl font-medium">Quizz app</h1>
                    <div className="flex flex-col w-full h-full items-center my-2">
                      {quiz.questions[SliceIndex] && (
                        <>
                        <h1 className="text-2xl font-semibold text-center">{quiz.questions[SliceIndex].question}</h1>
                        <div className="flex flex-col items-center my-3">
                          {quiz.questions[SliceIndex].answers.map((answer:string,index) => (
                            <Button className="my-1 min-w-[600px] text-sm text-right flex items-center justify-start"  key={index} variant={answer === selectedAnswer ? "default" : "secondary"} onClick={() => handleSelectAnswer(answer,quiz.questions[SliceIndex].correctAnswer)}>{answer}</Button>
                          ))}
                        </div>
                        </>
                        
                      )}
                    </div>
                    <div className="flex flex-row items-center gap-4">
                    <div className="bg-black py-2 px-4 rounded-lg text-white">{SliceIndex+1} / {quiz.questions.length}</div>
                    <Button onClick={SliceIndex !== quiz.questions.length-1 ? handleNextButton : handleSubmitButton} className="">{SliceIndex !== quiz.questions.length-1 ? "Next" : "See result"}</Button>

                    </div>


                    </>
        )}
        {Finished && <Button onClick={() => handleReset()}>Reset</Button>}

      </div>
    </main>
  );
}
