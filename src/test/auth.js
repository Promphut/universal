var auth = require('../services/auth')
var Request = require('superagent')
var Nightmare = require('nightmare');		
var nightmare = Nightmare({ 
        show: true ,
        switches: {
          'ignore-certificate-errors': true
        }
      });

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  /** 
   * User[0] = Editor
   * User[1] = Unregistered User
   * User[2] = FB User
   */

var user = ['ochawin@likemeinc.com','nightmaretest@gmail.com', 'naoise.solomon@gmail.com']
var password = ['12345678','nightmaretest', 'thisistestuser55678*']
var FRONTURL = process.argv[2] ? process.argv[2] : 'http://localhost:3000'
var BACKURL = FRONTURL.substr('localhost')!=-1 ? 'https://localhost:4000' : 'https://api.thesolar.co'
var token

/*Request.post(BACKURL + '/auth')
  .send({username : user[0], password : password[0]})
  .set('Accept', 'application/json')
  .then(res => {
    token = res.body.token
  })
  .then(()=> Request
      .delete(BACKURL+'/users/' + user[1])
      .query({token: token})
      .set('Accept','application/json')
      .then(res => {
      })
    ).then(*/
  nightmare
  .goto(FRONTURL)
  .wait(2000)

  /*SIGN IN
  *
  */
  /*CASE 1 : SIGN IN WITH CORRECT EMAIL-----------------------------------------------------------------------------*/
  .click("#SignInPageButton")
  .wait(2000)

  .insert('#SignInEmailField',user[0])
  .insert('#SignInPasswordField', password[0])
  .click('#SignInButton')
  .wait(2000)
  
  .click("#RightMenuButton")
  .wait(2000)
  .click("#LogOutButton")
  .wait(2000)

  /*CASE 2 : SIGN IN WITH WRONG EMAIL/PASSWORD-----------------------------------------------------------------------------*/
  .click("#SignInPageButton")
  .wait(2000)

  .insert('#SignInEmailField',user[1])
  .insert('#SignInPasswordField', password[0])
  .click('#SignInButton')
  .wait(2000)

  /*CASE 3 : SIGN IN WITH FB-----------------------------------------------------------------------------*/

  .click("#SignInFacebookButton")
  .wait(2000)
  .wait("#email")

  .insert('#email', user[2])
  .insert('#pass', password[2])
  .click("#loginbutton")
  .wait(5000)

  .click("#RightMenuButton")
  .wait(2000)
  .click("#LogOutButton")
  .wait(2000)

  /*CASE 3 : LOGGED IN WITH FB & SIGN IN WITH FB-----------------------------------------------------------------------------*/
  .goto('https://wwww.facebook.com')
  .insert('#email', user[2])
  .insert('#pass', password[2])
  .click("#loginbutton")
  .wait(5000)

  .click("#SignInPageButton")
  .wait(2000)

  .click("#SignInFacebookButton")
  .wait(5000)

  .click("#RightMenuButton")
  .wait(2000)
  .click("#LogOutButton")
  .wait(2000)

  /*SIGN UP
  *
  */
  /*CASE 1 : SIGN UP WITH USED EMAIL----------------------------------------------------------------------------------*/
  .goto(FRONTURL)

  .click("#SignInPageButton")
  .wait("#SignUpButton")
  .wait(1000)

  .click("#SignUpButton")
  .wait(2000)

  .insert("#EmailField",user[0])
  .click("#ConfirmEmailButton")
  .wait(2000)

  .click("#AuthBackButton")
  .wait("#SignUpButton")
  .wait(1000)

  /*CASE 2 : SIGN UP WITH AVAILABLE EMAIL----------------------------------------------------------------------------------*/

  .click("#SignUpButton")
  .wait(2000)

  .insert("#EmailField",user[1])
  .click("#ConfirmEmailButton")
  .wait(2000)

  .insert("#SignUpPasswordField",password[1])
  .insert("#SignUpPasswordAgainField",password[1])
  .click("#ConfirmSignUp")
  .wait(3000)

  .click("#RightMenuButton")
  .wait(2000)
  .click("#LogOutButton")
  .wait(2000)

  /*CASE 3 : SIGN IN AGAIN-------------------------------------------------------------------------------------------------------------*/
  
  .click("#SignInPageButton")  
  .insert('#SignInEmailField',user[1])
  .insert('#SignInPasswordField', password[1])
  .click('#SignInButton')
  .wait(3000)

  .click("#RightMenuButton")
  .wait(2000)
  .click("#LogOutButton")
  .wait(2000)

  /*EDITOR AVAILABILITY
  *
  */
  .click("#SignInPageButton")
  .wait(2000)

  .insert('#SignInEmailField',user[0])
  .insert('#SignInPasswordField', password[0])
  .click('#SignInButton')
  .wait(2000)

  .click("#TopNewStoryButton")
  .wait(2000)
  .back()
  .wait(2000)

  .click("#RightMenuButton")
  .wait(2000)
  .click("#EditorModeButton")
  .wait(2000)

  // /*OTHER OPTION-------------------------------------*/
  
    // .click("#RightMenuButton")
    // .wait(2000)
    // .click("#MyStoriesButton")
    // .wait(2000)

    // .click("#RightMenuButton")
    // .wait(2000)
    // .click("#EditProfileButton")
    // .wait(2000)

    // .click("#RightMenuButton")
    // .wait(2000)
    // .click("#SettingsButton")
    // .wait(2000)

  /*FINISH -----------------------------------------------------------------------------------------*/

  .end()
  .then(function () {
    console.log('Finished');
  })
  .catch(function (error) {
    console.error('Finished With Error', error);
  })//)
      