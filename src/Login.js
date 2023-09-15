import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ref, push } from 'firebase/database';
import { useState } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyC7lodXJQ4fzrWUTfn430wEU_VkJuPe9zg",
    authDomain: "manifest-shell-378911.firebaseapp.com",
    databaseURL: "https://manifest-shell-378911-default-rtdb.firebaseio.com",
    projectId: "manifest-shell-378911",
    storageBucket: "manifest-shell-378911.appspot.com",
    messagingSenderId: "1028687603316",
    appId: "1:1028687603316:web:40482013c87f6861021321",
    measurementId: "G-FZNLT7QQ4M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSaveUser = () => {
    // Save user data to Firebase Realtime Database
    const dbRef = ref(app.database(), 'users');
    push(dbRef, {
      email,
      password,
    })
      .then(() => {
        window.location.href = 'https://timerappp.netlify.app/';
      })
      .catch((error) => {
        console.error('User save error: ', error);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          window.location.href = 'https://timer-new-h923.vercel.app/';
        } else {
          window.location.href = 'https://timer-new-h923.vercel.app/';
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div>
      <h1 className="h1 text-center">Log In</h1>
      <div className="container-fluid mt-5 w-75">
        <form>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleSaveUser}
          >
            Save User
          </button>
          <br />
          <button
            type="button"
            className="mt-5"
            onClick={handleGoogleSignIn}
          >
            <img src="google.png" id="sbtn" alt="Google Sign In" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
/**
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
    <title>Document</title>
    <script type="text/javascript">
		var workTime = 25 * 60; // 25 minutes in seconds
		var breakTime = 5 * 60; // 5 minutes in seconds
		var timerId = null;
		var isWorking = true;
		
		function startTimer() {
			timerId = setInterval(countdown, 1000);
		}
		
		function pauseTimer() {
			clearInterval(timerId);
			timerId = null;
		}
		
		function resetTimer() {
			pauseTimer();
			if (isWorking) {
				workTime = 25 * 60;
				updateTimer(workTime);
			} else {
				breakTime = 5 * 60;
				updateTimer(breakTime);
			}
		}
		
		function countdown() {
			if (isWorking) {
				workTime=workTime-100;
				if (workTime == 0) {
					pauseTimer();
					alert("Time's up! Take a break.");
					isWorking = false;
					updateTimer(breakTime);
					startTimer();
				} else {
					updateTimer(workTime);
				}
			} else {
				breakTime--;
				if (breakTime == 0) {
					pauseTimer();
					alert("Break's over! Time to work.");
					isWorking = true;
					updateTimer(workTime);
					startTimer();
				} else {
					updateTimer(breakTime);
				}
			}
		}
		
		function updateTimer(timeLeft) {
			var minutes = Math.floor(timeLeft / 60);
			var seconds = timeLeft % 60;
			document.getElementById("timer").innerHTML = padZero(minutes) + ":" + padZero(seconds);
		}
		
		function padZero(num) {
			if (num < 10) {
				return "0" + num;
			} else {
				return num;
			}
		}
	</script>
</head>
<body>
    <div class="container mx-auto w-25 mt-5">
        <h1>Pomodoro Timer</h1>
        <div id="timer">25:00</div>
        <button onclick="startTimer()" class="btn btn-success" >Start</button>
        <button onclick="pauseTimer()" class="btn btn-warning" >Pause</button>
        <button onclick="resetTimer()" class="btn btn-danger" >Reset</button>
    </div>
    
</html>
 */