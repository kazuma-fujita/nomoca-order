import { AmplifyAuthCognitoStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyAuthCognitoStackTemplate) {
  // 仮パスワードメールの件名と本文の設定。cli-inputs.jsonのinvitationEmailSubjectとMessageの値を取得し設定
  resources.userPool.addPropertyOverride('AdminCreateUserConfig', {
    InviteMessageTemplate: {
      EmailMessage: {
        Ref: 'invitationEmailMessage',
      },
      EmailSubject: {
        Ref: 'invitationEmailSubject',
      },
    },
  });

  // Set the user pool emailConfiguration
  // SESからメール送信をする設定
  resources.userPool.emailConfiguration = {
    emailSendingAccount: 'DEVELOPER',
    sourceArn: 'arn:aws:ses:us-east-1:409193243105:identity/no-reply@nomoca-order.com',
  };
}
