import React, {useCallback, useEffect, useState} from 'react'
import {User, UserQuery} from '../models/user'
import {Loader} from "./Loader"
import Form from "./Form"
import Users from "./Users"

const Main = () =>  {
    const [dataQuery, setDataQuery] = useState<Array<User> | null>(null)
    const [query, setQuery] = useState<UserQuery | null>(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const searchQuery = async (query:UserQuery, controller: AbortController) => {
        try {
            setLoading(true)
            const response = await fetch('/api/users/', {
                    method: 'POST',
                    body: JSON.stringify(query),
                    headers: {'Content-Type': 'application/json'},
                    signal: controller ? controller.signal : null
            })
            const data = await response.json()
            setDataQuery(data)
        } catch (error: any) {
            setError(error.message)
        } finally {
            if(!controller.signal.aborted) setLoading(false)
        }
    }
    useEffect(() => {
        setError(null)
    }, [error])

    const onClickQuery = (email: string, number: string) => {
        let queryNew: UserQuery = {
            email: email,
            number: number === '' ? undefined : number
        }
        setQuery(queryNew)
    }

    useEffect(() => {
        const controller = new AbortController()
        if (query) searchQuery(query, controller)
        return () => controller.abort()
    }, [query])

    return(
        <main className="main">
            <div className="main__container">
                <div className="main__title"><h1>Поиск пользователей</h1></div>
                <div className="main__search">
                   <Form onClickQuery={onClickQuery}/>
                </div>
                <div className="main__line"></div>
                <div className="main__result result-users">
                    { error ? error.message : !dataQuery && !loading
                        ? "Введите поисковой запрос"
                        : loading
                            ? <Loader/>
                            : dataQuery && <Users users={dataQuery}/>}
                </div>
            </div>
        </main>
    )
}

export default Main