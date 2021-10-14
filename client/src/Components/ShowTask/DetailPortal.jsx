import React, { useState } from 'react'
import {
  Button,
  Card,
  Header,
  Segment,
  TransitionablePortal,
} from 'semantic-ui-react'

const DetailPortal = (props) => {
  const [, setState] = useState({ open: false }) 

  const handleOpen = () => setState({ open: true })

  const handleClose = () => setState({ open: false })

  var a = props.element.image;
  var image = '';

  if(a){
    image = a.slice(1).slice(0,-1);
  }
  const handleOnchange = (event)=>{
    props.onChange(event.target.value);
  }

    return (
      <TransitionablePortal
        closeOnTriggerClick
        onOpen={handleOpen}
        onClose={handleClose}
        openOnTriggerClick
        trigger={
            <Card onClick={props.handleCardClick} className='card' 
            style={{margin: '20px'}}
            >
            <Card.Content >
              <Card.Header>{props.element.title}</Card.Header>
              {props.element.suburb ? <Card.Meta>{props.element.suburb}</Card.Meta> : <Card.Meta>Online</Card.Meta>}
              <Card.Description>{props.element.description}</Card.Description>
            </Card.Content>
    
            <Card.Content >
              <Card.Description>{`Date: ${props.element.date}`}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui one buttons">
                <Button inverted value={props.element._id} onClick={handleOnchange} color="red"
                >
                  Delete
                </Button>
              </div>
            </Card.Content>
          </Card>
        }
      >
        <Segment
          style={{ 
              left: '20%', position: 'absolute', top: '20%', zIndex: 1000, backgroundColor:  '#e4e5f5',
              width: '700px', heigt: '500px', itemAlign: 'center'
            }}
        //   style={{ position: 'absolute',  zIndex: 1000 }}
        >
          <Header>{props.element.title}</Header>
          {props.element.type ?  <p>Type: {props.element.type}</p>: ''}
          {props.element.description ? <p>Description: {props.element.description}.</p>: ''}
          {props.element.suburb ? <p>Suburb: {props.element.suburb}</p>: ''}
          {props.element.date ? <p>Date: {props.element.date}</p>: ''}
          {props.element.estimated_price ? <p>Estimated Price: ${props.element.estimated_price}</p> : ''}
          { image !== 'ul' && image !== ''? <img alt='img' src={image} width={'70%'} 
                style={{marginLeft: 'auto',
                 marginRight: 'auto', display: 'block'}}></img> : ''} 
        </Segment>
      </TransitionablePortal>
    )
  }

  export default DetailPortal;
