import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
    let list = localStorage.getItem('list');
    if (list) {
        return JSON.parse(localStorage.getItem('list'))
    }
    else {
        return []
    }
}

function App() {
    const [name, setName] = useState('');
    const [list, setList] = useState(getLocalStorage());
    const [isEditing, setIsEditing] = useState(false);
    const [eidtId, setEidtId] = useState(null);
    const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            //display alert
            showAlert(true, 'danger', 'Please enter values')

        }
        else if (name && isEditing) {
            //deal with edit
            setList(
                list.map((item) => {
                    if (item.id === eidtId) {
                        return { ...item, title: name }
                    }
                    return item
                })
            )
            setName('')
            setEidtId(null)
            setIsEditing(false)
            showAlert(true, 'success', 'value changed')
        }
        else {

            showAlert(true, 'success', 'Item successfully Added to list');
            const newItem = { id: new Date().getTime().toString(), title: name };
            setList([...list, newItem]);
            setName('');
        }
    }

    const showAlert = (show = false, type = '', msg = '') => {
        setAlert({ show, type, msg })
    }

    //Clear all item of list
    const clearList = () => {
        showAlert(true, 'danger', 'Empty List')
        setList([])
    }

    //Remove Item from list
    const removeItem = (id) => {
        showAlert(true, 'danger', 'Item Deleted')
        setList(list.filter((item) => item.id !== id))
    }

    //Edit item of list
    const editItem = (id) => {
        const specificItem = list.find((item) => item.id === id)
        setIsEditing(true)
        setEidtId(id)
        setName(specificItem.title)

    }

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])



    //JSX start from here
    return <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
            {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
            <h3>grocery bud</h3>
            <div className="form-control">
                <input type="text" className='grocery' placeholder="e.g eggs" value={name} onChange={(e) => setName(e.target.value)} />
                <button type="submit" className="submit-btn">{isEditing ? 'Edit' : 'submit'}</button>
            </div>
        </form>
        {list.length > 0 && (
            <div className="grocery-container">
                <List items={list} removeItem={removeItem} editItem={editItem} />
                <button className="clear-btn" onClick={clearList}>clear items</button>
            </div>
        )}

    </section>
}

export default App
