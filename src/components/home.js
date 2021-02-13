import React from "react";

class Home extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      tokenIn: '',
      leverageToken: '',
      amount: '',
      mode: '1',
      ltv: '0.5',
      isOpen: false,
      account: ''
    }
  }


    async componentDidMount(){
      try{
        const account = await getAccounts();
        this.changeState('account', account);
      }
      catch(e){
        console.log(e);
      }
    }
  
    open = () => {
      this.setState(({
        isOpen: true
      }));
    }
  
    close = () => {
      this.setState(({
        isOpen: false
      }));
    }
  
    toggle = () => {
      this.setState((prevState) => ({
        isOpen: !prevState.isOpen
      }));
    }
  
    changeState = (key, value) => {
      this.setState(({
        [key]: value
      }), () => console.log(this.state));
    }
  
    render(){
  
      const {amount, mode, ltv} = this.state;
      const deposit =  amount / (1 - ltv);
      let borrow = deposit - amount;
  
      return(
        <div id="home-container">
          <p>Hey there!</p>
          <div id="home-portal">
            <div id="home-portal-input">
              <Dropdown mode="1" onSelect={this.changeState} />
              <Input name={'amount'} value={amount} placeholder="Enter amount" onInput={(val) => this.changeState('amount', val)} />
              <Dropdown mode="2" onSelect={this.changeState} />
              <p>Amount: {deposit}</p>
              <Input name={'mode'} value={mode} placeholder="Enter mode" onInput={(val) => this.changeState('mode', val)} />
              <Input name={'ltv'} value={ltv} placeholder="Enter ltv" onInput={(val) => this.changeState('ltv', val)} />
              <button onClick={this.open}>Proceed</button>
            </div>
            {this.state.isOpen && <Steps {...this.state} deposit={deposit} borrow={borrow} />}
          </div>
        </div>
      );
    }

  }


export default Home;