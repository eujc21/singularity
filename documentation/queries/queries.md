# Queries

Singularity has many types of queries enabled. Each query operator can be added used multiple times and compounded at the end when the final query is built

Example :

```js
App.Collections.Projects()
 .where('createdAt', '>=', new Date())
 .where('serviceType', '=', 'HVAC')
 .sortBy('createdAt', -1)
 .sortBy('cost', 1)
 .fetch()
 .then((results) => console.log(results))
```

####Operators
Singularity has changed the MongoDB operators to match what most developers are used to when programming.

```
 = is $eq (we cannot use $eq in minimongo so we just do { key : value })
 > is $gt
 < is $lt
 >= is $gte
 <= is $lte
 != is $ne
 in is $in
 !in is $nin
 or is $or
```

####Where
Where has the capability to find by various operators.

```js
where(key, is, value)
```

Example :

```js
Collection()
 .where('createdAt', '<=', new Date())
 .cursor()
```
