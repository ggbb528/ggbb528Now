import alarms from './alarms';
import chat from './chat';

try {
  // set alarms
  alarms();

  // chat
  chat();
} catch (e) {
  console.log(e);
}
