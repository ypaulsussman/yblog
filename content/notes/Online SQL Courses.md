---
title: Online SQL Courses (various)
date: "2019-03-29"
template: "post"
draft: true
slug: "/posts/online-sql-course-notes/"
category: "What I Read"
tags:
  - "SQL"
description: "I realized I'd been relying on very basic, stultified strategies for querying our database; given my absence of any formal SQL training, I elected to run though a few online intro courses. Here are the notes on what I'd never verbalized or formally intuited before (...or just didn't know.)"
---

## [Select Star SQL](https://selectstarsql.com/)

Backticks can be used to denote column and table names. This is useful when the column or table name is the same as a SQL keyword and when they have a space in them.

---

In SQL, `NULL` is the value of an empty entry. This is different from the empty string `''` and the integer `0`, both of which are not considered `NULL`.

To check if an entry is `NULL`, use `IS` and `IS NOT` instead of `=` and `!=`.

---

```sql
SELECT
  county,
  COUNT(*) AS county_executions
FROM executions
GROUP BY county
```

Didn’t we just learn not to mix aggregated and non-aggregated columns?

- The difference above is that grouping column(s) are the _only_ columns allowed to be non-aggregate in the query.
- That is, all the rows composing a given group must have the same values on that/those column(s), so there’s no ambiguity in the value that should be returned.
- The grouping columns don't necessarily have to be in the `SELECT` block.

Using `GROUP BY` with multiple columns will group only those rows that have the same value for _all_ listed columns (_thus resulting in more rows, each composing more-specific groups_)

---

The below code finds the percentage of executions from each county. (_100.0 is a decimal so we can get decimal percentages._)

```sql
SELECT
  county,
  100.0 * COUNT(*) / (select count(*) from executions)
    AS percentage
FROM executions
GROUP BY county
ORDER BY percentage DESC
```

---

`JOIN` creates a big combined table which is then fed into the `FROM` block just like any other table.

The `JOIN` command defaults to performing what is called an “_inner join,_” in which unmatched rows are dropped.

A join creates enough rows of so that each matching row gets its own partner. In this way, joins can create tables that are larger than the their constituents.

---

`previous` is derived from `executions`, so we’re effectively joining `executions` to itself. This is called a _“self join_” and is a powerful technique for allowing rows to get information from other parts of the same table.

```sql
SELECT
  last_ex_date AS start,
  ex_date AS end,
  -- sqllite requires functions to perform operations on dates
  JULIANDAY(ex_date) - JULIANDAY(last_ex_date) AS day_difference
FROM executions
JOIN (
    SELECT
      ex_number + 1 AS ex_number,
      ex_date AS last_ex_date
    FROM executions
  ) previous
  ON executions.ex_number = previous.ex_number
ORDER BY day_difference DESC
LIMIT 10
```

---

## [PostgreSQL Exercises](https://pgexercises.com/)

### Basic

The `IN` operator is a good early demonstrator of the elegance of the relational model.

- The argument it takes is not just a list of values - it's actually a table with a single column.
- Since queries also return tables, if you create a query that returns a single column, you can feed those results into an `IN` operator:

```sql
select *
	from cd.facilities
	where
		facid in (
			select facid from cd.facilities
			);
```

This example is functionally equivalent to just selecting all the facilities, but shows you how to feed the results of one query into another.

---

Below, we're doing computation in the area of the query between `SELECT` and `FROM`:

```sql
select name,
	case when (monthlymaintenance > 100) then
		'expensive'
	else
		'cheap'
	end as cost
	from cd.facilities;
```

Previously we've only used this to select columns that we want to return, but you can put anything in here that will produce a single result per returned row - including subqueries.

---

Below, you use a subquery to find out what the most recent `joindate` is:

```sql
select firstname, surname, joindate
	from cd.members
	where joindate =
		(select max(joindate)
			from cd.members);
```

- This subquery returns a scalar table - that is, a table with a single column and a single row.
- Since we have just a single value, we can substitute the subquery anywhere we might put a single constant value.
- In this case, we use it to complete the `WHERE` clause of a query to find a given member.

---

### Joins and Subqueries

The `INNER JOIN` combines two tables based on a join expression.

- Where we find a match, a row combining the values for each table is returned.
- We alias tables because we might need join to the same table several times, which would require us to distinguish between columns from each different time the table was joined in.

---

A 'self join' is really useful if you have columns that reference data in the same table, like if you want to e.g. produce a list of all members who have recommended another member (and the `member_id` and `recommended_by` fields are in the same table.)

---

When you want to sort by sth you haven't yet constructed (this holds true for the `distinct` as well):

```sql
select distinct mem.firstname || ' ' || mem.surname as member, fac.name as facility
    from cd.members mem
    join cd.bookings bk on mem.memid = bk.memid
    join cd.facilities fac on bk.facid = fac.facid
    where fac.facid in (0,1) -- these are the id's for the tennis courts
    order by member;
```

...will return every distinct member (_by first and last name, combined_) who's booked one of the tennis courts.

Note this won't work if you replace the pipes-concatenation with `concat_ws(' ', mem.firstname, mem.surname)`.

---

You can use the calculated `member`/`cost` columns within the `group by`, `order by`, and `having` clauses: but not within the `where` clause:

```sql
select mem.firstname || ' ' || mem.surname as member,
fac.name as facility,
case
 	when mem.memid = 0
 	then fac.guestcost * bk.slots
	else fac.membercost * bk.slots
	end
as cost
from cd.members mem
join cd.bookings bk on mem.memid = bk.memid
join cd.facilities fac on bk.facid = fac.facid
where bk.starttime < '2012-09-15'
and bk.starttime >= '2012-09-14>'
and (
  (mem.memid = 0 and fac.guestcost * bk.slots > 30)
  or (mem.memid != 0 and fac.membercost * bk.slots > 30)
  )
order by cost desc;
```

To remove the duplicated `'member : guest'` check in the `where` clause, use a subquery:

```sql
select member, facility, cost from (
    select mem.firstname || ' ' || mem.surname as member,
    fac.name as facility,
    case
        when mem.memid = 0
        then fac.guestcost * bk.slots
        else fac.membercost * bk.slots
        end
    as cost
    from cd.members mem
    join cd.bookings bk on mem.memid = bk.memid
    join cd.facilities fac on bk.facid = fac.facid
    where bk.starttime < '2012-09-15'
    and bk.starttime >= '2012-09-14>'
    ) as bookings
where cost > 30
order by cost desc;
```

---

### Modifying Data

As long as you fill in data for all columns of the table, in the order they were defined when you created the table, explicitly specifying the column names is optional:

`INSERT INTO cd.facilities VALUES (9, 'Spa', 20, 30, 100000, 800);`

---

`VALUES` will insert constant data; however, it's also possible to use `SELECT` wherever you see a `VALUES`:

```sql
INSERT INTO cd.facilities
    (facid, name, membercost, guestcost, initialoutlay, monthlymaintenance)
    SELECT 9, 'Spa', 20, 30, 100000, 800;
```

This `INSERT... SELECT` pattern is often used to generate data to insert dynamically, based on the information already in the database.

For example, this query autoincrements the `facid`:

```sql
INSERT INTO cd.facilities
    (facid, name, membercost, guestcost, initialoutlay, monthlymaintenance)
    SELECT (SELECT MAX(facid) FROM cd.facilities) + 1, 'Spa', 20, 30, 100000, 800
```

(_Though, obviously, you'd instead want to use the_ `SERIAL` _type to do this w/o worry about concurrent operations generating the same ID._)

---

Updating columns based on calculated data can be done with subqueries:

```sql
update cd.facilities facs
    set
        membercost = (select membercost * 1.1 from cd.facilities where facid = 0),
        guestcost = (select guestcost * 1.1 from cd.facilities where facid = 0)
    where facs.facid = 1;
```

As the number of columns we want to update increases, however, standard SQL can start to get pretty awkward.

Postgres provides a nonstandard extension to SQL called `UPDATE...FROM` that allows you to supply a `FROM` clause to generate values for use in the `SET` clause:

```sql
update cd.facilities facs
    set
        membercost = facs2.membercost * 1.1,
        guestcost = facs2.guestcost * 1.1
    from (select * from cd.facilities where facid = 0) facs2
    where facs.facid = 1;
```

---

Often you're using `JOIN` unnecessarily: when wrestling through one, think through whether a `WHERE IN / WHERE NOT IN` statement could work just as well:

```sql
DELETE FROM cd.members WHERE memid NOT IN (SELECT memid FROM cd.bookings);
```

---

### Aggregation

The basic idea of an aggregate function is that it takes in a column of data, performs some function upon it, and outputs a scalar (single) value.

---

When you specify a `GROUP BY`, the database produces an aggregated value for each distinct value in the supplied columns. That is, the `GROUP BY` construct:

- batches the rows together that have (the same value in a given field), then
- runs the aggregation function separately for each batch (or... well, group.)

Depending on which database system we use, validation might not be able to deduce a 1:1 mapping between \${fields in and not in the `GROUP BY` construct}. As such, it's generally safest to group by **all** columns you don't have an aggregate function on: this will ensure better cross-platform compatibility.

---

`EXTRACT` allows you to get individual components of a timestamp, like day, month, year, etc. (So does `DATE_PART`, but it's not ANSI-compliant... though it's a little faster.)

---

Aggregation happens after the `WHERE` clause is evaluated: we can thus use the `WHERE` to restrict the data we aggregate over.

The behaviour of `HAVING` is easily confused with that of `WHERE`. In the context of a query with an aggregate function:

- `WHERE` is used to filter what data gets input into the aggregate function, while
- `HAVING` is used to filter the data once it is output from the function.

---

Note you can pass a `CASE`, or indeed other equations, into an aggregate function:

```sql
select fac.name as name, (
  sum(
    bk.slots *
    case
        when bk.memid = 0
        then fac.guestcost
        else fac.membercost
    end
	)
  ) as revenue
from cd.facilities fac
join cd.bookings bk
on fac.facid = bk.facid
group by name
order by revenue;
```

However, Postgres (_unlike SQL Server and MySQL_) doesn't support putting column names in the `HAVING` clause.

Therefore, to limit the above query, you'd need to wrap it in a subquery and use `WHERE`:

```sql
select name, revenue from (
    select fac.name as name, (
      sum (
        bk.slots *
        case
          when bk.memid = 0
          then fac.guestcost
          else fac.membercost
        end
        )
      ) as revenue
    from cd.facilities fac
    join cd.bookings bk
    on fac.facid = bk.facid
    group by name
    ) as agg
where revenue < 1000
order by revenue;
```

As a result, `HAVING` is often best for simple queries, with the "subquery + `WHERE`" approach working better for more complex logic.

---

**Common Table Expressions** (CTE's) allow you to define a database view inline in your query, thus preventing code duplication.

They're declared in the form `WITH cte_name AS (sql_expression)`:

```sql
WITH sum AS (
    SELECT facid, sum(slots) AS totalslots
	FROM cd.bookings
	GROUP BY facid
)

SELECT facid, totalslots
	FROM sum
	WHERE totalslots = (
        SELECT MAX(totalslots)
        FROM sum
	);
```

---

One common use-case of CTE's is to show the same data with different groupings:

```sql
with bookings as (
	select facid, extract(month from starttime) as month, slots
	from cd.bookings
    where extract(year from starttime) = '2012'
)

select facid, month, sum(slots) from bookings group by facid, month
union all
select facid, null, sum(slots) from bookings group by facid
union all
select null, null, sum(slots) from bookings
order by facid, month;
```

In Postgres 9.5+, this can be shortened still further with the `ROLLUP` operator:

```sql
select facid, extract(month from starttime) as month, sum(slots) as slots
from cd.bookings
where extract(year from starttime) = '2012'

group by rollup(facid, month)
order by facid, month;
```

`ROLLUP` produces a hierarchy of aggregations in the order passed into it:

- `ROLLUP(facid, month)` outputs aggregations on `(facid, month)`, `(facid)`, and `()`.
- If we want an aggregation of all facilities for a month (_instead of all months for a facility_) we'd have to reverse the order, using `ROLLUP(month, facid)`.
- If we instead want _all_ possible permutations of the columns we pass in, we can use `CUBE` rather than `ROLLUP`. This will produce `(facid, month)`, `(month)`, `(facid)`, and `()`.

`ROLLUP` and `CUBE` are special cases of `GROUPING SETS`.

- `GROUPING SETS` allow you to specify the exact aggregation permutations you want.
- You could, for example, ask for just `(facid, month)` and `(facid)`, skipping the top-level aggregation.

---

A **window function** performs a calculation across a set of table rows that are somehow related to the current row.

- This is comparable to the type of calculation that can be done with an aggregate function.
- Behind the scenes, the window function is able to access more than just the current row of the query result.
- As such, unlike regular aggregate functions, a window function does _not_ cause rows to become grouped into a single output row.

Window functions operate on the result set of your query (after the `WHERE` clause and all standard aggregation) -- that is, on a "window" of data, as further defined by `PARTITION BY`.

For example, if we didn't want to restrict the data from the query -- we just want a count of _all_ members -- we would use `OVER()` without a `PARTITION BY`:

```sql
select count(*) over(), firstname, surname
  from cd.members
order by joindate
```

If, however, we want the count of all members who joined in the same month as that member, we would use:

```sql
select count(*) over(partition by date_trunc('month',joindate)),
  firstname, surname
  from cd.members
order by joindate
```

For each row that the window function operates over, the "window" is "any rows that have a `joindate` in the same month."

You can also add an `ORDER BY`, if, for example you want to know what number joinee they were that month:

```sql
select count(*) over(partition by date_trunc('month',joindate) order by joindate),
  firstname, surname
  from cd.members
order by joindate
```

Once we define an `ORDER BY` for a window function, for any given row the "window" is: "from the start of the dataset to current row."

- Here, then, the window goes from the start of the `PARTITION BY` to the current row, and not beyond.
- That is, for the first member who joins in a given month, the count is 1. For the second, the count is 2, and so on.

---

You can often use window functions to clean up the syntax of ranking, via the built-in `RANK()` window function:

```sql

with summed_slots as (
    select facid, sum(slots) as total
    from cd.bookings
    group by facid
    )

select facid, total from (
	select facid, total, rank() over (order by total desc) as rank
	from summed_slots
) as ranked
where rank = 1

```
Note that, because window functions are applied _after_ aggregation, you can actually remove the CTE from the above, and simply use `sum(slots)` directly in place of `total`.

---

Another often-used window function is `NTILE()`:

```sql
with summed_rev as (
    select fac.name as name, (
      sum(
        bk.slots *
        case
            when bk.memid = 0
            then fac.guestcost
            else fac.membercost
        end
        )
      ) as rev
    from cd.facilities fac
    join cd.bookings bk
    on fac.facid = bk.facid
    group by name
)


select tiled.name, 
case 
    when tiled.revenue = 1 then 'high' 
    when tiled.revenue = 2 then 'average' 
    else 'low' 
end as revenue
from (
    select summed_rev.name as name, ntile(3) over (order by summed_rev.rev desc) as revenue
    from summed_rev
    order by revenue, name
) as tiled
```
`NTILE` groups values (here, `summed_rev.rev`) into a passed-in number of groups (here, `3`), as evenly as possible. 

The value it outputs for each row a number from 1 to ${the number of groups specified}. (Each number represents that row's membership in the ${first, second, third, etc} _n_-tile of the set.)

---

##  https://sqlbolt.com/

## https://chartio.com/learn/sql/

You never got to the above: by the time you'd finished `pgexercises.com`, these sites' exercises felt too basic to merit repetition.

On revisitation: craft a comparative review of all four SQL sites, in terms of their instructional design and pedagogy, content sequencing, etc. First, create a rubric by which to [traverse, think through, evaluate] each.
  