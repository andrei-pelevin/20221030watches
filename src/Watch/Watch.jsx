import nextId from "react-id-generator";
import React, { useState } from 'react';
import Item from './Item';


const Watch = () => {
    const [forms, setValue] = useState({ name: '', timeZone: 0, id: '' });
    const [formsArr, setFormArr] = useState([])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === 'timeZone' && value > 12) {
            setValue(prev => ({ ...prev, [name]: 12 }))
        } else if (name === 'timeZone' && value < -12) {
            setValue(prev => ({ ...prev, [name]: -12 }))
        } else if (name === 'timeZone' && value >= -12 && value <= 12) {
            setValue(prev => ({ ...prev, [name]: Number(value) }))
        } else {
            setValue(prev => ({ ...prev, [name]: value, id: nextId() }));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValue(prev => ({ ...prev, id: nextId() }));
        setFormArr(prev => ([...prev, forms]));
    }

    function onDel(i) {
        const newArr = formsArr.filter(item => item.id !== i);
        setValue(prev => ({ name: '', timeZone: 0 }));
        setFormArr(newArr);
    }

    return (
        <div className="Watch">
            <form onSubmit={handleSubmit}>
                <div className="conteiner col-8 border border-3 p-3">
                    <div className="row">
                        <div className="col-3 ">Название</div>
                        <div className="col-3 ">Временная зона</div>
                        <div className="col-3 "></div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-3 ">
                            <input type='text'
                                id='text'
                                name='name'
                                className=""
                                value={forms.name}
                                onChange={handleChange} />
                        </div>

                        <div className="col-3 ">
                            <input id='distance'
                                type='number'
                                name='timeZone'
                                className=""
                                onChange={handleChange}
                                value={forms.timeZone} /></div>


                        <div className="col-3 ">
                            <button>Добавить</button>
                        </div>
                    </div>
                </div>
            </form>
            <div className='col-8 border border-3 p-3 d-flex flex-wrap'>



                {formsArr.map(item => {
                    return <Item name={item.name} timeZone={item.timeZone} onDel={onDel} key={item.id} id={item.id} />
                })}

            </div>

        </div>
    )
}
export default Watch;