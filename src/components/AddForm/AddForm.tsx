import React, {SyntheticEvent, useState} from "react";

import './AddForm.css'
import {Btn} from "../common/Btn";
import {geocode} from "../../utils/geoccoding";

export const AddForm = ()=> {

    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: 0,
        url: '',
        address: '',
    });

    const saveAd = async (e: SyntheticEvent)=> {
        e.preventDefault();

        setLoading(true);
        try {
            const {lat, lon} = await geocode(form.address);

            const res = await fetch(`http://localhost:3001/ad`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    lat,
                    lon,
                }),

            });
            const data = await res.json();

           setId(data.id);

        } finally {
            setLoading(false)
        }

    }

    const updateForm = (key: string, value: any)=> {
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }

    if (loading) {
        return <h2>Trwa dodawanie ogłoszenia.</h2>
    }

    if(id) {
        return <h2>Twoje ogłoszenie "{form.name}" zostało poprawnie dodane do serwisu pod ID: {id}.</h2>
    }

    return (
        <form action="" className="add-form" onSubmit={saveAd}>
        <h1>Dodawanie ogłoszenia.</h1>
        <p>
            <label>
                Nazwa: <br/>
                <input
                    type="text"
                    name="name"
                    required
                    maxLength={99}
                    value={form.name}
                    onChange={e=> updateForm('name', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label>
                Opis: <br/>
                <textarea
                    name="description"
                    maxLength={999}
                    value={form.description}
                    onChange={e=> updateForm('description', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label>
                Cena: <br/>
                <input
                    type="number"
                    name="price"
                    required
                    value={form.price}
                    onChange={e=> updateForm('price', Number(e.target.value))}
                /> <br/>
                <small>Pozostaw zero w polu, aby nie wyświetlać ceny.</small>
            </label>
        </p>
        <p>
            <label>
                Adres URL: <br/>
                <input
                    type="url"
                    name="url"
                    maxLength={99}
                    value={form.url}
                    onChange={e=> updateForm('url', e.target.value)}
                />
            </label>
        </p>
        <p>
            <label>
                Adres fizyczny na mapie: <br/>
                <input
                    type="text"
                    name="address"
                    required
                    value={form.address}
                    onChange={e=> updateForm('address', e.target.value)}
                />
            </label>
        </p>
        <Btn text="Zapisz"/>
    </form>
    )
}