<img width="450" alt="Screen Shot 2022-01-03 at 11 42 52 PM" src="https://user-images.githubusercontent.com/22313410/148026908-fe05a66a-e3a5-4759-8191-08e8a07476ce.png">


### Notes and Progress:

- I used React Native cli on IOS only
- I wasn't able to complete finish the challenge, the main problem I got stuck on was trying to access the `bids` state, which updates in the ui as I receive the callbacks from the socket, but the local state always defaults to a blank `bids` array when I try to access/compare within the callback and the `compareAndUpdateList` function in `src/screens/Main/index.tsx`
- I didn't work on the spread feature, due to the above blocker
- I didn't finish the performance optimization due to the above blocker, I instead put a crude "count" tracker to limit re-render for the time being
- I didn't write any test due to the above blocker

### To Run the App (If your machine is configured to run React Natve)

- In your terminal, change directory to the app folder, run `yarn`, then `cd ios && pod install`
- go back to the app directory, run `yarn start`
- in a separate terminal, change directory to the app folder, then run `yarn run ios`
- an iOS simulator should start and load the app
