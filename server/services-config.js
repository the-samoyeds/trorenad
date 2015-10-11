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
});
