import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';

import Header from './Header';
import ProjectFields from './ProjectFields';
import ProjectHead from './ProjectHead';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // let startState = {
    //   startErrorMsg: '',
    //   finishErrorMsg: '',
    //   errMessage: ''
    // };
    // this.state = startState;

    this.state = {
      name: '',
      start: '',
      finish: '',
      startErrorMsg: '',
      finishErrorMsg: '',
      errMessage: ''
    };
  }

  componentDidMount() {
    fetch('/api/projects/5c73478fb7d151384c46798b', {
      method: 'GET',
      headers: {
        Accept: 'application/x-www-form-urlencoded',
        'Content-Type': 'x-www-form-urlencoded'
      }
    })
      .then(response => response.json())
      .then(resJson => {
        this.setState(
          {
            name: resJson.projectName,
            milestones: resJson.mstoneIds,
            projectId: resJson._id
          },
          () => console.log('project _id: ', this.state.projectId)
        );
      })
      .catch(err => {
        this.setState({
          errMessage: `Issue loading project: ${err}`
        });
        console.log('Issue loading project: ', err);
      });
  }

  setDates = (which, date) => {
    this.setState({ [which]: date });
  };

  setName = name => {
    this.setState({ name });
    console.log(name);
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col lg={true}>
            <Header />
          </Col>
        </Row>
        <ProjectHead
          startDate={this.state.start}
          endDate={this.state.finish}
          onDateChange={this.setDates}
          onNameChange={this.setName}
        />

        <Row className="justify-content-center">
          <Col lg={6}>
            {this.state.projectId && (
              <ProjectFields
                milestones={this.state.milestones}
                projectId={this.state.projectId}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
