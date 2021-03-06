
const {AAA, CAT} = require('./log')
const mqtt_match = require('mqtt-match')

module.exports = (profile,path,port,cached) => {
  let result = profile.rules.find((rule)=>mqtt_match(rule,path))
  if (profile.rules_policy_deny_match){
    result = !result
  }
  if (result) {
    AAA.log(CAT.RULE_ALLOW,"ALLOWED",profile.user_id,path,port,(cached?'[cached profile]':''));
    return {status:true}
  } else {
    AAA.log(CAT.RULE_DENY,"DENIED",profile.user_id,path,port,(cached?'[cached profile]':''));
    return {status:false,error:'Supplied api key has no rule matching the requested resource'}
  }
}