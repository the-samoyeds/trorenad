Meteor.startup(function() {
  ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
      $set: {
        service: 'facebook',
        appId: '979465912116705',
        secret: '',
        loginStyle: 'popup'
      }
    }
  );
});
