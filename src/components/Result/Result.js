import React from 'react';
import Modal from 'react-bootstrap/Modal';
import creditCardImage from '../../assets/naranjaCard.png';
import gameboyImage from '../../assets/gameboy.svg';
import './Result.scss';

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const ResultFound = (props) => {
    if (!props.response) {
        return <React.Fragment />;
    }
    const response = props.response;
    let title = "";
    if (!props.search && props.response) {
        title = `Encontraste a ${capitalizeFirstLetter(props.response.name)}!!!`;
    }
    else {
        title = capitalizeFirstLetter(props.response.name);
    }
    const screenText = `Tipo: ${response.types.map(e => e.type.name).join(', ')}\n\nExperiencia base: ${response.base_experience}\n\nAltura: ${response.height} m\n\nPeso: ${response.weight} kg\n\nHabilidades: ${response.abilities.map(e => e.ability.name).join(', ')}`;

    let pokemonImage = response.sprites.other.dream_world.front_default;
    if (!pokemonImage) {
        pokemonImage = response.sprites.other['official-artwork'].front_default
    }

    return (
        <Modal centered size="lg" show={props.showResultFound} onHide={props.cleanSearch}>
            <Modal.Header closeButton>
                <Modal.Title className="result-title">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="gameboy-container">
                <textarea className="gameboy-screen" rows="5" defaultValue={screenText} />
                <img src={pokemonImage} />
                <img src={gameboyImage} />
            </Modal.Body>
      </Modal>
    );
}

export const ResultNotFound = (props) => {
    return (
        <Modal centered size="lg" show={props.showResultNotFound} onHide={props.cleanSearch}>
            <Modal.Header closeButton>
            <Modal.Title>{capitalizeFirstLetter(props.search)} no es un Pokémon</Modal.Title>
            </Modal.Header>
            <Modal.Body className="naranja-body">
                <p>Ahora con <b>Naranja</b> podes convertirte en un maestro Pokémon y crear el tuyo en <b>plan Z</b>.</p>
                <img src={creditCardImage} />
            </Modal.Body>
            <Modal.Footer className="naranja-footer">
                <p>Tener tarjeta de crédito Naranja es rápido y fácil</p>
                <a href ="https://www.naranja.com/" target="blank">¡Pedila ahora!</a>
            </Modal.Footer>
      </Modal>
    );
}
