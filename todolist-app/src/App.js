import './App.css';
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import List from './components/List';
import Alert from './components/Alert';
function App() {
  const [name, setName] = useState("")
  const [list, setList] = useState([])
  const [alert,setAlert] = useState({show:false,msg:'',type:''})
  const [checkEditItem,setCheckEditItem] =useState(false)
  const [editid,setEditId] = useState(null)
  const submitData = (e) => {
    e.preventDefault()
    if(!name){
//แสดง Alert
setAlert({show:true,msg:"กรุณาป้อนข้อมูลด้วย",type:"error"})
    }else if(checkEditItem && name){
          // กระบวนการอัพเดทข้อมูล 
          const result= list.map((item)=>{
            if(item.id ===editid){
              return{...item,title:name}
            }
            return item
          })
          setList(result)
          setName('')
          setCheckEditItem(false)
          setEditId(null)
          setAlert({show:true,msg:"แก้ไขข้อมูลเรียบร้อย",type:"error"})
    }else{
      const newItem = {
        id: uuidv4(),
        title: name
      }
      setList([...list, newItem])
      setName()
      setAlert({show:true,msg:"บันทึกข้อมูลเรียบร้อย",type:"successs"})
    }

  }

  const removeItem=(id)=>{
    list.filter((item)=>item.id)
    const result = list.filter((item)=>item.id !==id)
    setList(result) 
  }
  // console log เลข id ออกมา ตัวแปร result จะคัดกรองข้อมูลใน sate List ว่าเหลือกี่จำนวน จากนั้นใช้ฟั่งก์ชั่น setList แสดงค่า  sate List  ที่เหลืออยู่
  
  const editItem=(id)=>{
      setCheckEditItem(true)
      setEditId(id)
      const searchItem =list.find((item)=>item.id===id)
      setName(searchItem.title)
  }
  //กดแก้ไขข้อมูล แล้วนำข้อมูลมาแสดงที่ ช่อง label




  return (
    <section className="container">
      <h1>TodoList App</h1>
    
      {alert.show && <Alert{...alert} setAlert={setAlert}/>}
      <form className="form-group" onSubmit={submitData}>
        <div className="form-contol">
          <input type="text" className="text-input"
            onChange={(e) => setName(e.target.value)} value={name} list={List}></input>
          <button type="submt" className="submit-btn">
            {checkEditItem ? "แก้ไขข้อมูล":"เพิ่มข้อมูล"}
          </button>
        </div>
      </form>
      <section className='list-componets'>
          {list.map((data,index)=>{
            return <List key={index} {...data} removeItem={removeItem} editItem={editItem}/>
            //...data คือการ props เอา id กับ title ไปทำงานด้วย
          })}
      </section>
      </section>
  );
}

export default App;
