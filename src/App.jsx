import { useState } from 'react'
import './App.css'


function App(){
  const [subjects, setSubjects] = useState(10)
  const [marks, setMarks] = useState({})
  const [credits, setCredits] = useState({})
  const [gradePoint, setGradePoint] = useState({})
  const [showCgpa, setShowCgpa] = useState('')

  const handleMarksBlur = (index, value) => {
    let normalizedValue = parseInt(value) || 0;
    if (normalizedValue > 100) normalizedValue = 100;
    if (normalizedValue < 0) normalizedValue = 0;
    
    setMarks((prevValues) => ({
      ...prevValues,
      [index]: normalizedValue
    }));
  }

  const handleCreditsBlur = (index, value) => {
    let normalizedValue = parseInt(value) || 1;
    if (normalizedValue > 4) normalizedValue = 4;
    if (normalizedValue < 1) normalizedValue = 1;

    setCredits((prevValues) => ({
      ...prevValues,
      [index]: normalizedValue
    }));
  }

  const handleMarks = (index, value) => {
    setMarks((prevValues) => ({
      ...prevValues,
      [index]: value
    }));
  }

  const handleCredits = (index, value) => {
    setCredits((prevValues) => ({
      ...prevValues,
      [index]: value
    }));
  }

  const cgpaCalc = () => {
    let cgpa = 0;
    let sum = 0;
    let totalCredits = 0;
    let tempGradePoint = {};
    for (let i = 0; i < subjects; i++) {
      if (marks[i] >= 90) tempGradePoint[i] = 10;
      else if (marks[i] >= 75) tempGradePoint[i] = 9;
      else if (marks[i] >= 65) tempGradePoint[i] = 8;
      else if (marks[i] >= 55) tempGradePoint[i] = 7;
      else if (marks[i] >= 50) tempGradePoint[i] = 6;
      else if (marks[i] >= 45) tempGradePoint[i] = 5;
      else if (marks[i] >= 40) tempGradePoint[i] = 4;
      else tempGradePoint[i] = 0;
        
      sum += tempGradePoint[i] * credits[i];
      totalCredits += (credits[i] * 1);
    }

    setGradePoint(tempGradePoint);
    cgpa = parseFloat((sum / totalCredits).toFixed(2))
    console.log(cgpa)
    return cgpa
  }
  
  const handleSubmit = () => {
    const cgpa = cgpaCalc()
    setShowCgpa(`your cgpa is ${cgpa}`)
  }

  const handleKeyDown = (event, currentIndex, isCreditsInput) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      if (!isCreditsInput) {
        document.getElementById(`credits-${currentIndex}`).focus();
      } else if (currentIndex < subjects - 1) {
        document.getElementById(`marks-${currentIndex + 1}`).focus();
      } else {
        document.getElementById(`marks-0`).focus();
      }
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (isCreditsInput) {
        document.getElementById(`marks-${currentIndex}`).focus();
      } else if (currentIndex > 0) {
        document.getElementById(`credits-${currentIndex - 1}`).focus();
      } else {
        document.getElementById(`credits-${subjects - 1}`).focus();
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={{
      paddingTop: "20px",
      marginRight: "20px"
    }}>
      <div style={{
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        marginLeft: "80px"
      }}>
        IPU CGPA Calculator
      </div>
      <div>
        <label htmlFor='range' style={{
          fontSize: "20px",
          marginLeft: "80px"
        }}>No. of subjects:  {subjects}</label> <br /> <br />
        <input style={{marginLeft: "80px"}} id='range' type='range' min={5} max={15} value={subjects} onChange={(e) => {
              setSubjects(e.target.value)
            }}>
        </input> <br />
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "80px",
          marginTop: "25px"
        }}>
          <p style={{paddingRight: "70px"}}>Marks</p>
          <p>Credits</p>
        </div>
      </div>
      <div>
        {Array.from({length: subjects}, (_, index) => (
          <div key={index}>
            <div style={{
              margin: "10px",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: "10px"
            }}>
              <div>Subject {index + 1}</div>
              <div>
                <input 
                  id={`marks-${index}`}
                  type="number" 
                  min={0} 
                  max={100} 
                  style={{ width: "100px"}}
                  value={marks[index] || ''}
                  onChange={(e) => handleMarks(index, e.target.value)}
                  onBlur={(e) => handleMarksBlur(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index, false)}
                />
              </div>
              <div>
                <input 
                  id={`credits-${index}`}
                  type="number" 
                  min={1} 
                  max={4} 
                  style={{ width: "100px"}}
                  value={credits[index] || ''}
                  onChange={(e) => handleCredits(index, e.target.value)}
                  onBlur={(e) => handleCreditsBlur(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index, true)}
                />
              </div>
            </div>  
          </div>
        ))}
        
      </div>
      <div style={{
        margin: "50px"
      }}>
        <button style={{marginLeft: "80px"}} onClick={handleSubmit}>Submit</button>
      </div>
      <div style={{
        fontSize: "20px",
        marginLeft: "80px"
      }}>
        {showCgpa}
      </div>
    </div>
  )
}

export default App