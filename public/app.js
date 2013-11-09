
// Application Bootstrap
var app = angular.module( 'hack4good', [
  'angular-flash.service',
  'angular-flash.flash-alert-directive',
  'angularFileUpload'
]);

// Jquery plugin settings
jQuery.timeago.settings.allowFuture = true;