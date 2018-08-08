# inra-http-boilerplate

## Version

Current version of boilerplate is compatible with inra-server-http v1.4.0 

## Database
As that inra does not contain Database generic class so its nessecary to write own Database object.

In this boilerplate we have Database object connected to mongodb through mongoose so we can use it whenever we wants as database.mongoose
(DB is injected to app through dependency injector)