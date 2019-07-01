import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      showPostCode: false,
      zipCode: '',
      address: ''
    }
  }

  handleAddress = (data) => {
    let zoneCode = data.zonecode; // 새 우편번호, 구 우편번호(postcode)
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    if (zoneCode && fullAddress) {
      this.setState({
        zipCode: zoneCode,
        showPostCode: false,
        address: fullAddress
      });
    }

    console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  }

  theme = {
    searchBgColor: '#42DAC0',
    queryTextColor: '#FFFFFF'
  }
  render() {
    return (
      <div className="App">
        <div>
          <label>주소</label>
          <input className="zoneCode" value={this.state.zipCode} readOnly />
          <label>-</label>
          <button
            className="seachBtn"
            onClick={() => this.setState({ showPostCode: !this.state.showPostCode })}
          >
            우편번호 검색
          </button>
        </div>

        <div style={{ margin: '0 0 10px 35px' }}>
          <input className="address" value={this.state.address} readOnly />
        </div>
        <div style={{ marginLeft: '35px' }}>
          <input className="address2" />
        </div>

        {this.state.showPostCode && (
          <DaumPostcode
            width={350}
            height={450}
            style={{ position: 'absolute', top: '0', left: '0' }}
            theme={this.theme}
            onComplete={this.handleAddress}
          />
        )}
      </div>
    );
  }
}

export default App;
