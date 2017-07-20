var Nightmare = require('nightmare');		
var nightmare = Nightmare({ 
        show: true ,
        switches: {
          'ignore-certificate-errors': true
        }
      });

  /** 
   * User[0] = Editor
   * User[1] = Unregistered User
   * User[2] = FB User
   */

var user = ['ochawin@likemeinc.com','stepboomexe@gmail.com', '--fb--']
var password = ['12345678','eieiei', '--fb--pass']
var FRONTURL = 'http://localhost:3000'
      
nightmare
  .goto(FRONTURL)

  /*SIGN IN
  *
  */
  /*CASE 1 : SIGN IN WITH CORRECT EMAIL-----------------------------------------------------------------------------*/
  .click("#SignInPageButton")
  .wait(2000)

  .type('#SignInEmailField',user[0])
  .type('#SignInPasswordField', password[0])
  .click('#SignInButton')
  .wait(2000)
  
  .click("#RightMenuButton")
  .wait(2000)
  .click("#LogOutButton")
  .wait(2000)

  /*CASE 2 : SIGN IN WITH WRONG EMAIL/PASSWORD-----------------------------------------------------------------------------*/
  .click("#SignInPageButton")
  .wait(2000)

  .type('#SignInEmailField',user[1])
  .type('#SignInPasswordField', password[0])
  .click('#SignInButton')
  .wait(2000)

  /*CASE 3 : SIGN IN WITH FB-----------------------------------------------------------------------------*/

  .click("#SignInFacebookButton")
  .wait(2000)
  .wait("#email")

  .type('#email', user[2])
  .type('#pass', password[2])
  .type('#pass','\u000d')
  .wait(2000)

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

  .type("#EmailField",user[0])
  .click("#ConfirmEmailButton")
  .wait(2000)

  .click("#AuthBackButton")
  .wait("#SignUpButton")
  .wait(1000)

  /*CASE 2 : SIGN UP WITH AVAILABLE EMAIL----------------------------------------------------------------------------------*/

  .click("#SignUpButton")
  .wait(2000)

  .type("#EmailField",user[1])
  .click("#ConfirmEmailButton")
  .wait(2000)

  .type("#SignUpPasswordField",password[1])
  .type("#SignUpPasswordAgainField",password[1])
  .click("#ConfirmSignUp")
  .wait(3000)

  .click("#RightMenuButton")
  .wait(2000)
  .click("#LogOutButton")
  .wait(2000)

  /*CASE 3 : SIGN IN AGAIN-------------------------------------------------------------------------------------------------------------*/
  
  .click("#SignInPageButton")  
  .type('#SignInEmailField',user[1])
  .type('#SignInPasswordField', password[1])
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

  .type('#SignInEmailField',user[0])
  .type('#SignInPasswordField', password[0])
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

  /*OTHER OPTION-------------------------------------*/
  
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
  });
