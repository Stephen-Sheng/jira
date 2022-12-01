import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useState, useEffect } from "react"
import { cleanObject, useDebounce, useMount } from "utils"
import * as qs from "qs"

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name:'',
        personId:''
    })
    const [list, setList] = useState([])
    const [users,setUsers] = useState([])
    const debouncedParam = useDebounce(param,500)

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async res => {
            if(res.ok){
                setList(await res.json())
            }
        })
    },[debouncedParam])

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async res => {
            if(res.ok){
                setUsers(await res.json())
            }
        })
    })
    return <div>
        <SearchPanel param = {param} setParam = {setParam} users = {users} />
        <List list = {list} users = {users}/>
    </div>
}