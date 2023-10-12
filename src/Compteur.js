import React , {Component} from "react";

class Compteur extends Component{
    constructor(props){
        super(props)
        this.state = {
            isRunning: false,
            seconds: 0,
            minutes:0,
            heures: 0
        };

        this.timer = null;
    }

    handleStartStopClick = () => {
        if (this.state.isRunning) {
        // Arrêter le minutage
        clearInterval(this.timer);
        } else {
        // Démarrer le minutage
        this.timer = setInterval(() => {
            this.setState((prevState) => {
                let seconds = prevState.seconds + 1;
                let minutes = prevState.minutes;
                let heures = prevState.heures;

                if(seconds === 60){
                    seconds = 0;
                    minutes +=1
                }
                if(minutes === 60){
                    minutes = 0;
                    heures +=1;
                }

                return{
                    heures,
                    minutes,
                    seconds
                }
            });
        }, 1000);
        }
        this.setState((prevState) => ({
        isRunning: !prevState.isRunning,
        }));
    };

    handleResetClick = () => {
        clearInterval(this.timer)
        this.setState({
            isRunning: false,
            seconds: 0,
            minutes: 0,
            heures: 0
        })
    }

    render(){
        const {seconds , heures , minutes , isRunning} = this.state;
        return(
            <div className=" d-flex justify-content-center align-items-center py-5">
                <div className="border p-0 col-md-3 py-5 rounded text-light bg-dark">
                    <h1>Minuteur</h1>
                    <p className="pb-3">Temps écoulé: {heures}{heures<1 ? 'h': 'hrs'} {minutes}{minutes < 1 ? 'mn': 'mns'} {seconds}s</p>
                    <div className="d-flex justify-content-center">
                        <div className="col-md-3 rounded-circle d-flex justify-content-center py-4  mx-2" id="start">
                            <div role="button" className="py-1 text-success" onClick={this.handleStartStopClick} >
                                {isRunning ? 'Arrêter' : 'Démarrer'}
                            </div>
                        </div>
                        <div className="col-md-3 rounded-circle d-flex justify-content-center py-4  mx-2" id="stop">
                            <div role="button" className="py-1 text-light " onClick={this.handleResetClick}>Annuler</div>   
                        </div>
                    </div>
                </div>
            </div>    
        )
    }
}

export default Compteur