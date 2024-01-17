# <img src="https://github.com/damtchorzewski/s7vensurvivors-wallet/blob/main/src/utils/Svg/logo.svg"/>
## Description

Wallet Manager is a cutting-edge application tailored for efficient personal finance management. With a user-centric design and adaptability across diverse devices, it empowers users to effortlessly monitor transactions, track account balances, analyze expenditures, and strategize budgets.

## Features

### Registration and Login

The application facilitates a user-friendly account creation process through a registration form. Form validation is seamlessly handled using the Formik and Yup libraries, ensuring the accuracy of entered data. Following registration, users can securely log in using an authentication process.

### Email Verification

To enhance security, a crucial email verification step is implemented. After registration, users receive an email containing a verification link. Clicking on this link confirms the account and grants full access to the app's features.

### Dashboard

The main page of the application, accessible on various devices, provides users with instantaneous access to critical financial information. It prominently displays the current account balance, recent transactions, and an interactive chart illustrating expense structures.

### Transactions and Categories

Users can effortlessly add new transactions, specifying details such as amount, date, transaction type (e.g., income or expense), and additional comments. The application offers flexibility by enabling users to assign transactions to previously defined categories.

### Statistics and Analysis

Wallet Manager equips users with powerful tools for analyzing their financial behaviors. The Diagram page features an interactive chart providing insights into expenditure structures over specific time periods.

### Security and Convenience

Prioritizing user data security, the application stores tokens in localStorage using the redux-persist library. Passwords undergo thorough security checks during both login and registration, ensuring robust account security through the zxcvbn library.

### Responsiveness

Leveraging libraries like react-media, the application boasts full responsiveness, seamlessly adapting to various screen resolutions on mobile phones, tablets, and computers.

## Technologies

The project leverages cutting-edge technologies such as React 18, Vite for building, and an array of developer-friendly libraries, including Formik, Yup, Redux Toolkit, react-router-dom, and chart.js.

## Installation and Running

Before utilizing Wallet Manager, ensure Node.js is installed (version 14.17.3 or newer). Follow the installation steps outlined in the project's README file to set up and run the application.

## License

The project operates under the MIT license, granting users the freedom to use, modify, and distribute it freely in adherence to the license terms.

Wallet Manager stands as a comprehensive financial management tool, seamlessly blending modern design with essential features for effective budget planning and control.

## Screenshot

<img src="https://github.com/damtchorzewski/s7vensurvivors-wallet/blob/main/src/assets/images/stat.png"/>

<img src="https://github.com/damtchorzewski/s7vensurvivors-wallet/blob/main/src/assets/images/dash.png"/>

<img src="https://github.com/damtchorzewski/s7vensurvivors-wallet/blob/main/src/assets/images/log.png"/>




### Dependencies

The LTS version of [Node. js](https://nodejs. org/en/) must be installed on the computer.

### Overruled with Vite

1. Clone repo
2. Create your branch
3. Install Resources:

```shell
npm install
```

4. Enable working mode:

```shell
npm run dev
```

In your browser, go to [http://localhost:1234](http://localhost:1234).
