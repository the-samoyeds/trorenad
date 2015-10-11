Meteor.startup(function() {
  ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
      $set: {
        service: 'facebook',
        appId: Meteor.settings.facebook.appId,
        secret: Meteor.settings.facebook.secret,
        loginStyle: 'popup'
      }
    }
  );

  ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
      $set: {
        service: 'google',
        clientId: Meteor.settings.google.clientId,
        secret: Meteor.settings.google.secret
      }
    }
  );

});
