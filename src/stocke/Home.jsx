import React, { useState, useEffect } from 'react'
import '../stocke/Home.css'
import Dialog from '@mui/material/Dialog'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Home = () => {
  const [text, setText] = useState("")
  const [list, setList] = useState([])
  const [modalState, setModalState] = useState(false)
  const [value, setValue] = useState(Dayjs || null);
  const [dialog, setDialog] = useState(false)
  const [option,setOption] =useState("")
  const [option2,setOption2] =useState("")
  const [selectDate,setSelectDate] = useState(new Date)




  // ticker input work and ticker input local storage work
  const Go = () => {
    if (text === "") {
      return
    }
    let currentArray = [...list]
    let obj = {
      title: text,
    }
    currentArray.push(obj)
    setList(currentArray)
    localStorage.setItem("my_list", JSON.stringify(currentArray))
    setText("")
  }
  useEffect(() => {

    let oldList = localStorage.getItem("my_list")
    let arrayList = JSON.parse(oldList)
    if (arrayList) {
      setList(arrayList)
    }

  }, [])
  // ticker input work end...

  // Drop down input work ..
  const handleChange = (event) => {
    setOption(event.target.value);
  };
  const handleChange2 = (event) => {
    setOption2(event.target.value);
  };
  // then finish

  // 1st dialog state
  const [test, setTest] = useState(true)


// 2nd dialog state
  const [show, setShow] = useState(null)

  //  Enter key press from input
  const AcceptToDo = (e) => {
    if (e.key === "Enter") {
      setText(e.target.value)
      Go()
    } else {
      setText(e.target.value)
    }
  }

  return (
    // Header-work and input work is started..
    <>
      <div className='Header'>
        <div className='box'>
        <p>{text}</p>
        </div>
        <div className='Header-input'>
          {/* <input type="date"/> */}
          <input className="Input" type="text" placeholder='ticker' onKeyPress={AcceptToDo} value={text} onChange={e => setText(e.target.value)} />
        </div>
        {/* ended a header-wrok and input work.. */}
        {/* input button work */}
        <div className='Input-btn'>
          <p onClick={Go}>Go</p>
        </div>
        {/* input button work finish */}

        {/* Header two buttons and show the dialog btn */}
        <div>
          <div className='Animation'>

            <button className='Input-btn-1' onClick={() => setModalState(true)}>Add Stock Trade</button>


            <button className='Input-btn-2' onClick={() => setDialog(true)}>Add Options Trade</button>
          </div>

        </div>

      </div>

      <div style={{
        paddingLeft: "0.5vw",
        width: "5.5vw",
        height: "100vh",
      }}>
        {
        list.slice(0, 10,).map((each, index) => {
            return (
              <div key={index}>
                <p className='List-group'>{each.title}</p>
              </div>
            )
          })
        }
      </div>
      <div>
        {/* ternary operators */}

{/* dialog working and ternary opeartors */}
      </div>

      <Dialog
        open={modalState}
        onClose={() => setModalState(false)}
      >

        <div style={{ backgroundcolor: '#f0f0f0',width:'486px',display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{ fontfamily: "Oswald,sans-serif", fontWeight: "100", fontSize: "36pt",marginLeft:'-294px',marginInline:'11px' }}>AAPL</div>
          <div className='Stock-purchase-radio-btn'>
            <p>Stock Purchased:</p>
            <FormControl>

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="NO" control={<Radio />} onClick={() => setTest(true)} label="Yes" />
                <FormControlLabel value="Yes" control={<Radio />} onClick={() => setTest(false)} label="No" />
              </RadioGroup>
            </FormControl>
          </div>
          {
            test ?
              <>
                <div style={{ margin: '4px',display:'flex', marginLeft:'-151px'}}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Basic example"
                      value={selectDate}
                      onChange={(newValue) => {
                        setSelectDate(newValue);
                      }}
      
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
                <div className='input-div'>
                  <input className='Enter-Qty-input' type="number" placeholder='Enter QTY' min={0} />
                  <input className='Stock-price-input' type="number" placeholder='Stock Price' min={0} />
                </div>
                <div className='still-holding'>
                  <p>Still Holding</p>
                  <FormControl>

                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="NO" control={<Radio />} onClick={()=>setShow(false)} label="Yes" />
                      <FormControlLabel value="Yes" control={<Radio />} onClick={()=>setShow(true)} label="No" />
                    </RadioGroup>
                  </FormControl>
                  {show ?  <div style={{ margin: '4px',marginRight:'-99px' }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>: null}

                  
                </div>

              </>
              : null

          }
          <div>
            <button className='submit-btn' onClick={() => setModalState(false)} style={{marginRight:'317px',}}>Submit</button>
          </div>
        </div>
       {/* 1st dialog and ternary opeartors end */}



      </Dialog>
      {/* Dialog 2 working start */}
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
      >

        <div style={{ backgroundcolor: '#f0f0f0', width: '480px', overflowY: 'auto', height: '200vh', fontfamily: "Oswald,sans-serif",margin:'5px'}}>
          <div>
            <p style={{ fontWeight: "100", fontSize: "36pt", marginTop: '3px' }}>AAPL</p>
          </div>
          <div>
          </div>
          <div style={{ margin: '5px', marginTop: '-31px',height: '4.4375em' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectDate}
                onChange={(newValue) => {
                  setSelectDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div style={{ margin: '5px',height: '4.4375em' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={selectDate}
                onChange={(newValue) => {
                  setSelectDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div style={{ margin: '5px',height: '4.4375em' }}>
            <TextField style={{ width: '255px', }}
              id="outlined-number"
              label="Number"
              type="number"
              placeholder='Days To Expiration'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div style={{ margin: '5px',height: '4.4375em' }}>
            <TextField style={{ width: '255px', }}
              id="outlined-number"
              label="Number"
              type="number"
              placeholder='Strike Price'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <FormControl style={{ width: '250px', margin: '5px',height: '4.4375em' }}>
              <InputLabel id="demo-simple-select-label">Select Option</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={option}
                onChange={handleChange}
                label="Select Option"
              >
                <MenuItem value={'call'}>Call</MenuItem>
                <MenuItem value={'put'}>Put</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ margin: '5px',height: '4.4375em' }}>
            <TextField style={{ width: '255px', }}
              id="outlined-number"
              label="Number"
              type="number"
              placeholder='Numbers Of Contracts'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <FormControl style={{ width: '250px', margin: '5px',height: '4.4375em' }}>
              <InputLabel id="demo-simple-select-label">Select Option</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={option2}
                onChange={handleChange2}
                label="Select Option"
              >
                <MenuItem value={'Bought'}>Bought</MenuItem>
                <MenuItem value={'Sold'}>Sold</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ margin: '5px' ,height: '4.4375em'}}>
            <TextField style={{ width: '255px', }}
              id="outlined-number"
              label="Number"
              type="number"
              placeholder='Debit/Cost (negative number)'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div style={{ margin: '5px',height: '4.4375em' }}>
            <TextField style={{ width: '260px', }}
              id="outlined-number"
              label="Number"
              type="number"
              placeholder='Premium Received (positive number)'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div>
            <button className='submit-btn' onClick={() => setDialog(false)}>Submit</button>
          </div>
        </div>
      </Dialog>
     {/* 2nd Dialog work is done  */}
    </>
    // Header work is done with 2 dialog and dialog inner work is complete.... 
  )
}

export default Home