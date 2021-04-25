import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import logo from '../../assets/pokelogo.png'
import pokeball from '../../assets/pokeball.gif';
import { ResultFound, ResultNotFound } from '../Result/Result';
import './Main.scss';

const generateRamdonID = () => {  
    return Math.floor(Math.random() * 800);
}

const Main = () => {
    const [response, setResponse] = useState(null);
    const [search, setSearch] = useState('');
    const [showResultNotFound, setshowResultNotFound] = useState(false);
    const [showResultFound, setshowResultFound] = useState(false);

    const searchPokemon = async (random) => {
        let searchParameter = "";
        let response = null;
        if (random) {
            setSearch(''); // clean any possible search
            searchParameter = generateRamdonID();
        }
        else {
            searchParameter = search.toLowerCase();
        }
        try {
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchParameter}/`);
        } 
        catch(err) {
            console.log(err);
        }
        finally {
            if (response && Object.keys(response.data).length) {
                setResponse(response.data);
                setshowResultFound(true);
            }
            else {
                setshowResultNotFound(true);
            }
        }
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            searchPokemon();
        }
      }

    const cleanSearch = () => {
        setResponse(null);
        setshowResultNotFound(false);
        setshowResultFound(false);
    }

    return (
        <main>
            <img className="logo" src={logo} alt="logo" />
            <InputGroup size="lg" className="search">
                <FormControl type="search" className="search-input" placeholder="Que Pokémon estás buscando?" onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} value={search} />
                <Button variant="outline-primary" onClick={() => searchPokemon()} disabled={!search ? true : false} className="search-button">consultar</Button>
            </InputGroup>
            <a onClick={() => searchPokemon(true)}>
                <img src={pokeball} className="pokeball" alt="pokeball" />
            </a>
            <ResultFound showResultFound={showResultFound} cleanSearch={cleanSearch} response={response} search={search} />
            <ResultNotFound showResultNotFound={showResultNotFound} cleanSearch={cleanSearch} search={search} />
        </main>
    );
}

export default Main;
