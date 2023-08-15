import React, {Component} from "react"
// import Clarifai from 'clarifai';

import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBackground from "./components/Particles/ParticlesBackground";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import RegisterForm from "./components/RegisterForm/RegisterForm";

// metadata.set("authorization", "27c63126a4304346bb094f7c1ff9c18e");
/*const app = new Clarifai.App({
    apiKey:'27c63126a4304346bb094f7c1ff9c18e'
});*/

class  App extends Component {
    constructor(props) {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route:'signin',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries:0 ,
                joined: new Date()
            },
        }
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        });
    }

    calculateFaceLocation(response) {
        const data = response.outputs[0].data.regions[0].region_info.bounding_box;
    
        const image = document.getElementById('inputImage')
        const width = Number(image.width);
        const height = Number(image.height);
        
        console.log(width, height);
        console.log('From calculate method',data);
        // console.log(this.state.box);
        
        return {
            leftCol: data.left_col * width,
            topRow: data.top_row * height ,
            rightCol: width - (data.right_col * width),
            bottomRow: height - (data.bottom_row * height),
        }
    }
    
    displayFaceBox(box) {
        this.setState({box: box})
        console.log('From Display Face method', this.state.box);
    }
    
    onInputChange = (e) => {
        this.setState({input: e.target.value})
    }
    
    onSubmit = () => {
        console.log('button clicked');
        this.setState({imageUrl: this.state.input});
        const USER_ID = 'zx59ox3pamtc';//(the code by your name)
        const PAT = '27c63126a4304346bb094f7c1ff9c18e';//(your Clarifai api key)
        const APP_ID = 'my-first-application-ljlar';//(what you named your app in Clarifai)
        const MODEL_ID = 'face-detection';
        const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
        const IMAGE_URL = this.state.input;
        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [{"data": {"image": {"url": IMAGE_URL}}}]
        });
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            }, body: raw
        };
        
        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
            .then(response => response.text())
            .then(response => {
                console.log(response);
                const parser = JSON.parse(response)
                const faceBox =  parser.outputs[0].data.regions[0].region_info.bounding_box;
                //console.log('hi', parser.outputs[0].data.regions[0].region_info.bounding_box)

                // console.log(response)
                if (response) {
                    fetch('http://localhost:3001/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count.entries }))
                        })
                 }
                this.displayFaceBox(this.calculateFaceLocation(parser))
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    onRouteChange = (route) => {
        this.setState({route: route});
        if (route === 'home') {
            this.setState({isSignedIn: true});
        } else {
            this.setState({isSignedIn: false})
        }
    }
    
    render() {
       const  {imageUrl, route, box, isSignedIn} = this.state;
        
        const authorizedPage = ( <div>
            {/*Logo*/}
            <Logo/>

            {/*Rank component*/}
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>

            {/*Image Link form Component for inputting the image link*/}
            <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onSubmit}
            />

            {/*Face recognition display component*/}
            <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>);
        
        return (
            <div className="App">
                {/*The dynamic background of moving particles*/}
                <ParticlesBackground/>
                
                {/*Navigation section of the application*/}
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                { route === "home"  ? authorizedPage :
                    (route === 'signin' ?
                        <Signin loadUser={this.loadUser} isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>:
                        <RegisterForm  onRouteChange={this.onRouteChange}/>
                    )
                }
            </div>
        );
    }
}

export default App;
