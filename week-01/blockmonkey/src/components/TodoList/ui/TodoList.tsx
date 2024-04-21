import { useState, useEffect } from "react"
import { getProfileApi } from "../../../api/auth";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from "../../../constants/routes";
import { createTodoListApi, getTodoListsApi, removeTodoListApi, updateTodoListApi } from "../../../api/todoList";
import { TodoList } from "../../../api/todoList/type";

const TodoList = () => {
  const navi = useNavigate();
  const [UserName, setUserName] = useState("");
  const [TodoLists, setTodoLists] = useState<TodoList[]>([]);
  const [CreateTodoListInput, setCreateTodoListInput] = useState("");
  const [UpdateItemId, setUpdateItemId] = useState<number | null>(null);
  const [UpdatedTitle, setUpdatedTitle] = useState("");

  // TODO :
  // Session Access Token is Exist ?
  // OR Navi to SignIn Page
  useEffect(() => {
    const acToken = sessionStorage.getItem("ac_token");

    if (!acToken) {
      navi(ROUTES.SIGN_IN);
    }

    getProfileApi(acToken as string).then(res => {
      setUserName(res.username);
    }).catch((e) => { 
      console.log(`Get Profile API ERROR`);
      console.log(e);
      // Navi to sign in page when token expired;
      navi(ROUTES.SIGN_IN);
    })

    getTodoLists();
  }, [])
    
  const createTodoListHandler = async() => {
    const acToken = sessionStorage.getItem("ac_token");
    if (!acToken) {
      navi(ROUTES.SIGN_IN);
    }
    
    if (acToken) {
      try {
        const res = await createTodoListApi({ title: CreateTodoListInput }, acToken);
        alert(`${res.id} 생성`);
      } catch (e : any) {
        console.log(`=== Create Todo List Failed ===`);
        alert(e.response.data.message)
      } finally {
        await getTodoLists();
        setCreateTodoListInput("");
      }
    }
  }

  const getTodoLists = async () => {
    const acToken = sessionStorage.getItem("ac_token");
    if (acToken) {
      try {
        // TODO LISTS
        const res = await getTodoListsApi(acToken);

        res.sort((a, b) => {
          if (a.completed && !b.completed) {
            return 1
          } else if (!a.completed && b.completed) {
            return -1;
          } else {
            return 0;
          }
        });

        setTodoLists(res);
      } catch (e: any) {
        console.log(`=== Get Todo List Failed ===`);
        alert(e.response.data.message)
      }
    }
  }

  const updateTodoListHandler = async () => {
    const acToken = sessionStorage.getItem("ac_token");
    const selectedItem = TodoLists.filter((item) => item.id === UpdateItemId)[0];

    if (acToken && UpdateItemId && UpdatedTitle.length > 1) {
      try {
        const body = {
          id: UpdateItemId,
          title: UpdatedTitle,
          completed : selectedItem.completed,
        }
        await updateTodoListApi(body, acToken)
      } catch (e : any) {
        console.log(`=== Update Todo List Failed ===`);
        alert(e.response.data.message)
      } finally {
        await getTodoLists();
        setUpdatedTitle("");
        setUpdateItemId(null);
      }
    }
  }

  const removeTodoListHandler = async (e :any) => {
    const acToken = sessionStorage.getItem("ac_token");
    const itemId = e.target.parentElement.getAttribute('item-key');
    if (acToken) {
      try {
        const res = await removeTodoListApi(itemId, acToken);
        alert(`${res.id} removed`);
      } catch (e : any) {
        console.log(`Remove TodoList Error`);
        alert(e.response.data.message);
      } finally {
        getTodoLists();
      }
    }
  }

  const completeHandler = async (e) => {
    const acToken = sessionStorage.getItem("ac_token");
    const itemId = e.target.parentElement.getAttribute('item-key');
    const selectedItem = TodoLists.filter((item) => item.id === Number(itemId))[0];

    if (acToken && !selectedItem.completed) {
      try {
        const body = {
          id: itemId,
          title: selectedItem.title,
          completed : true,
        }
        await updateTodoListApi(body, acToken)
      } catch (e : any) {
        console.log(`Complete TodoList Error`);
        console.log(e);
      } finally {
        getTodoLists();
      }
    }
  }
  
    return (
      <>
        {/* Header */}
        <div>
          <h2>TodoList </h2>
          <h4>Welcome {UserName} !</h4>
        </div>

        {/* Create TodoList */}
        <div>
          <input
            type="text"
            placeholder="Any Task ?"
            value={CreateTodoListInput}
            onChange={e => setCreateTodoListInput(e.currentTarget.value)}
          />
          <button onClick={createTodoListHandler}>추가</button>
        </div>

        {/* Body */}
        {TodoLists && TodoLists.map((item, _) => (
          <div key={item.id}>
            <div>
              {
                UpdateItemId === item.id ?
                  <div>
                    title : 
                    <input
                      type="text"
                      placeholder="edit title"
                      value={UpdatedTitle}
                      onChange={e => setUpdatedTitle(e.currentTarget.value)}
                    />
                    <button onClick={updateTodoListHandler}>수정</button>
                    <button onClick={() => setUpdateItemId(null)}>취소</button>
                  </div>
                  :
                  <div>title : {item.title}</div>
              }
              <div>completed : {item.completed ? "✅" : "🏃🏻‍♂️"}</div>
              <div>writer : {item.user.id}</div>
            </div>

            <div item-key={item.id}>
              <button onClick={e => removeTodoListHandler(e)}>삭제</button>
              <button onClick={() => setUpdateItemId(item.id)}>수정</button>
              <button onClick={e => completeHandler(e)}>완료</button>
            </div>
          </div>
        ))}
      </>
    )
}
  
export default TodoList