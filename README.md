# Node_Auth
Node passport jwt session

#creating a db in mongo atlas
  - Create new cluster (if needed)
  - after cluster is created click on security
    - add new user
        -add detalis
        - choose read and write to anyy db
    -after user is created chose IP Whitelist
        -add ip address
            -choose Allow access from anywhere or 0.0.0.0
            -if restricted access choose current ip address
    -connecting to cluster
        -choose connect in the man cluster info page
        -choose connect to application and choose short SRV connection string

create basic express server

flash is used for sessions it works along with express-session
    -flash has its own middleware
        -needs to be added
    `
    app.use(

    session({

        secret: 'secret',
        resave: true,
        saveUninitialized: true
        //cookie:{secure:true}
    })

    );
    app.use(flash())
    `

auth.js
    custom middleware for route blocking ie untile user logs in he cannot access the page
        add this middleware to all the routes which need authentication until logged in
