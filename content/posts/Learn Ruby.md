---
title: Learn Ruby
date: "2017-12-28"
template: "post"
draft: false
slug: "/posts/learn-ruby-notes/"
category: "What I Read"
tags:
  - "Codecademy"
  - "Ruby"
description: "Notes from an online course I took to surreptitiously be less StackOverflow-dependent when on the server. (Tagline: \"In this course, you will gain familiarity with Ruby and basic programming concepts — including variables, loops, control flow, and most importantly, object-oriented programming.\")"
---

# The basics

If you start with `=begin` and end with `=end`, everything between those two expressions will be a comment.

By convention, local variables should start with a lowercase letter and words should be separated by underscores.

---

`gets` is the Ruby method that gets input from the user.
* When getting input, Ruby automatically adds a newline after each input;
* `chomp` removes that extra line.

The `!` at the end of `.capitalize` says, "hey, modify the value contained within the variable itself."

```ruby
print "What's your first name? "
first_name = gets.chomp
first_name.capitalize!

print "What's your last name? "
last_name = gets.chomp
last_name.capitalize!

print "What city are you from? "
city = gets.chomp
city.capitalize!

print "What state or province are you from? "
state = gets.chomp
state.upcase!

puts "Your name is #{first_name} #{last_name} and you're from #{city}, #{state}!"
```

---

The `.gsub!` method stands for "global substitution."

As a general rule, Ruby methods that end with `?` evaluate to booleans.

```ruby
print "Thtring, pleathe!: "
user_input = gets.chomp
user_input.downcase!

if user_input.include? "s"
 user_input.gsub!(/s/, "th")
else
 puts "Nothing to do here!"
end
 
puts "Your string is: #{user_input}"
```

---

## Loops

This program counts to 9 and not 10 because we use three dots; this tells Ruby to exclude the final number in the count. (If we use two dots, this tells Ruby to include the highest number in the range.)

```ruby
for num in 1...10
 puts num
end
```

---

The `next` keyword can be used to skip over certain steps in the loop. For instance, if we don't want to print out the even numbers, we can write:

```ruby
i = 20
loop do
 i -= 1
 next if i % 2 == 1
 print "#{i}"
 break if i <= 0
end
```
---

The `.each` method can apply an expression to each element of an object, one at a time:

```ruby
object.each { |item| 
 # Do something 
}
```
You can also use the `do` keyword instead of `{}`:

```ruby
object.each do |item| 
 # Do something 
end
```

The variable name between `| |` can be anything you like; it's just a placeholder for the individual element of the object you're using `.each` on.

`Array#each` is just a way of looping over items and applying the given block. It doesn't affect the array or create a new object, and it returns `.self`.

`.collect` is for when you want to turn one array into another array (it’s an alias for `.map`.)

`.inject` is for when you want to turn an array into a single value (it’s an alias for `.reduce`.)

`.select` is for when you want to return only some values from an array (it functions the same as `.filter` in JS: but it’s not an alias for anything.)

---

`.split` takes in a string and returns an array. If we pass it a bit of text in parentheses, `.split` will divide the string wherever it sees that delimiter.

```ruby
puts "Text to search through: "
text = gets.chomp
puts "Word to redact: "
redact = gets.chomp

words = text.split(" ")

words.each do |word|
 if word != redact
   print word + " "
 else
   print "REDACTED "
 end
end
```

---

## Hashes

Everything in Ruby is an **object**.

A **hash** is the equivalent to a JS object -- a set of key:value pairs. You can use any Ruby object for a key or value.

**Hash literal notation** assigns values to keys using `=>` (or a colon, after Ruby 1.8).

```ruby
my_hash = { 
 "name" => "Eric",
 "age" => 26,
 "hungry?" => true
}

puts my_hash["name"]
puts my_hash["age"]
puts my_hash["hungry?"]
```

Hash constructor notation lets you assign values using bracket notation.

```ruby
pets = Hash.new
pets["Fido"] = "dog"
```

You can provide a hash with **default values**. If you have a hash with a default value, and you try to access a non-existent key, you get that default value:

```ruby
h = Hash.new("nothing here")

puts h
# {}

puts h["kitty"]
# nothing here
```

Otherwise, if you try to access a key that doesn't exist, you'll get `nil`, the second of two non-true values in Ruby. (The other is, well, `false`.)

To act on key:values in a hash:

```ruby
restaurant_menu = {
 "noodles" => 4,
 "soup" => 3,
 "salad" => 2
}

restaurant_menu.each do |item, price|
 puts "#{item}: #{price}"
end

# another example:

colors = { 
 "blue" => 3,
 "green" => 1,
 "red" => 2
}

colors = colors.sort_by do |color, count|
 count
end
```

---

The following has a **default parameter** (same as ES6):

```ruby
def alphabetize(arr, rev=false)
#...
end
```

If no `rev` param is passed in, then it will automatically be `false`.

---

## Methods

A method definition has three parts:
* The **header**, which includes the `def` keyword, the name of the method, and any arguments the method takes.
* The **body**, which is the code block that describes the procedures the method carries out. The body is indented two spaces by convention (as with `for`, `if`, `elsif`, and `else` statements)
* The method **ends** with the `end` keyword.

The **argument** is the piece of code you actually put between the method's parentheses when you call it, and the **parameter** is the name you put between the method's parentheses when you define it.

**Splat arguments** are arguments preceded by a *, which tells the program that the method can receive one or more arguments:

```ruby
def salutation(greeting, *friends)
 friends.each { |friend| puts "#{greeting}, #{friend}!" }
end
```

---

We can use the **combined comparison operator** to compare two Ruby objects. It...
* returns 0 if the first operand equals the second,
* 1 if the first operand is greater than the second, and
* -1 if the first operand is less than the second.

It's very useful for sorting:

```ruby
books = ["Charlie and the Chocolate Factory", "War and Peace", "Utopia", "A Brief History of Time", "A Wrinkle in Time"]

# sorts ascending
books.sort! { |firstBook, secondBook| firstBook <=> secondBook }

# sorts descending
books.sort! { |firstBook, secondBook| secondBook <=> firstBook}
```

---

`.respond_to?()` returns true if an object can receive a method, and false otherwise:

```ruby
[1, 2, 3].respond_to?(:push)
```

...would return `true`, since you can call `.push` on an array object.

Side note: Instead of typing out `.push`, you can also use `<<` to add an element to the end of an array or string.

---

Methods are public by default in Ruby.

**Private methods** can only be called from other code inside the object. (Another way to say this is that the method cannot be called with an explicit receiver: whenever you call object.method, object is the receiver of method.)

---

## Symbols

You can use strings as Ruby hash keys; however, it's better to use symbols.
* While multiple different strings can all have the same value,
* there's only one copy of any particular symbol at a given time.

The `.object_id` method gets the ID of an object -- it's how Ruby knows whether two objects are the exact same object:

```ruby
puts "example_string".object_id 
puts "example_string".object_id 
#these lines will have different ID's

puts :example_symbol.object_id 
puts :example_symbol.object_id 
#these lines will have identical ID's
```

Symbols are primarily used either as hash keys or for referencing method names. Symbols make good hash keys:
* They're immutable, meaning they can't be changed once they're created;
* Only one copy of any symbol exists at a given time, so they save memory;
* Symbol-as-keys are faster than strings-as-keys because of the above two reasons.

To convert between symbols and strings:

```ruby
:sasquatch.to_s
# ==> "sasquatch"

"sasquatch".to_sym
# ==> :sasquatch
# .intern does the same as .to_sym
```

With Ruby 1.9, you can declare objects w/o the hash rocket:

```ruby
new_hash = { 
 one: 1,
 two: 2,
 three: 3
}
```

---

## Blocks

Blocks are similar to JS anonymous functions.

_Y thinks: "a block is the poor man’s first-class-citizen function: function-as-parameter, but a limited one.”_

A block will only be called once, and in the context of wherever it's defined.

A method can take a block as a parameter. That's what `.each` does:

```ruby
[1, 2, 3, 4, 5].each { |i| puts i }
```

Passing a block to a method is a great way of abstracting certain tasks away from the method, then defining those tasks whenever we call the method.

---

To filter a hash for values that meet certain criteria, use `.select`:

```ruby
grades = { 
 alice: 100,
 bob: 92,
 chris: 95,
 dave: 97
}

grades.select { |name, grade| grade <  97 }
# ==> { :bob => 92, :chris => 95 }

grades.select { |k, v| k == :alice }
# ==> { :alice => 100 }
```

---

Ruby includes two hash methods, `.each_key` and `.each_value`, that do exactly what you'd expect:

```ruby
movie_ratings = {
 memento: 3,
 primer: 3.5,
 the_matrix: 3,
 truman_show: 4,
 red_dawn: 1.5,
 skyfall: 4,
 alex_cross: 2,
 uhf: 1,
 lion_king: 3.5
}

names = movie_ratings.each_key {|name| puts name}

# memento 
# primer
# the_matrix
# truman_show
# red_dawn
# skyfall
# alex_cross
# uhf
# lion_king
```

---

The `.collect` method takes a block and applies the expression in the block to every element in an array:

```ruby
my_nums = [1, 2, 3]
my_nums.collect { |num| num ** 2 }
# ==> [1, 4, 9]
```

Note that `.collect` returns a copy, but doesn't change/mutate the original array (unless you run it as `.collect!`)

---

Methods that accept blocks have a way of transferring control from the calling method to the block and back again. We can build this into the methods we define by using the `yield` keyword:

```ruby
def block_test
 puts "We're in the method!"
 puts "Yielding to the block..."
 yield
 puts "We're back in the method!"
end

block_test { puts ">>> We're in the block!" }

# We're in the method!
# Yielding to the block...
# >>> We're in the block!
# We're back in the method!
```

---
## Procs

Blocks are not objects; this is one of the very few exceptions to the "everything is an object" rule in Ruby. Because of this, blocks can't be saved to variables.

A proc is a "saved" block: just like you can give a bit of code a name and turn it into a method, you can name a block and turn it into a proc. Call Proc.new and pass in the block you want to save:

```ruby
##Example 1:
multiples_of_3 = Proc.new do |n|
 n % 3 == 0
end

print (1..100).to_a.select(&multiples_of_3)
# The `&` is used to convert the proc into a block 

##Example 2: 
floats = [1.2, 3.45, 0.91, 7.727, 11.42, 482.911]

round_down = Proc.new do |num|
 num.floor
end

ints = floats.collect(&round_down)
print ints

##Example 3: 
def greeter
 yield
end

phrase = Proc.new do
 puts "Hello there!"
end

greeter(&phrase)
```

We can call also procs directly by using the `.call` method:

```ruby
say_hi = Proc.new { puts "Hello!" }
say_hi.call
```

Just as you can pass a Ruby method name around with a symbol, you can also convert symbols to procs with `&`:

```ruby
strings = ["1", "2", "3"]
nums = strings.map(&:to_i)
# ==> [1, 2, 3]
```

---
Lambdas

Lambdas are created with the following syntax: `lambda { |param| block }`

```ruby
strings = ["leonardo", "donatello", "raphael", "michaelangelo"]

symbolize = lambda {|string| string.to_sym}

symbols = strings.collect(&symbolize)
print symbols
```

---

Two main differences between Procs and Lambdas:
1. A lambda checks the **number of arguments** passed to it (and throws an error if you pass it the wrong number of arguments), whereas a proc will ignore unexpected arguments and assign nil to any that are missing.
2. When a lambda returns, it **passes control back** to the calling method; when a proc returns, it does so immediately, without going back to the calling method:

```ruby
def batman_ironman_proc
 victor = Proc.new { return "Batman will win!" }
 victor.call
 "Iron Man will win!"
end

puts batman_ironman_proc
# "Batman will win!" => ends as soon as the Proc returns

def batman_ironman_lambda
 victor = lambda { return "Batman will win!" }
 victor.call
 "Iron Man will win!"
end

puts batman_ironman_lambda
# "Iron Man will win!" => reenters the 'batman_ironman_lambda' function as soon as the lambda returns
```

---

Another Lambda example:
```ruby
crew = {
 captain: "Picard",
 first_officer: "Riker",
 lt_cdr: "Data",
 lt: "Worf",
 ensign: "Ro",
 counselor: "Troi",
 chief_engineer: "LaForge",
 doctor: "Crusher"
}

first_half = lambda { |key, value| value < 'M' }

a_to_m = crew.select(&first_half)
```

---
## Classes

An example:

```ruby
class Language
 def initialize(name, creator)
   @name = name
   @creator = creator
 end
        
 def description
   puts "I'm #{@name} and I was created by #{@creator}!"
 end
end

ruby = Language.new("Ruby", "Yukihiro Matsumoto")
python = Language.new("Python", "Guido van Rossum")
javascript = Language.new("JavaScript", "Brendan Eich")

ruby.description
python.description
javascript.description
```

---

Examples of scope in Ruby:

```ruby
class Computer
 $manufacturer = "Mango Computer, Inc."
 @@files = {hello: "Hello, world!"}
 
 def initialize(username, password)
   @username = username
   @password = password
 end
 
 def current_user
   @username
 end
 
 def self.display_files
   @@files
 end
end

# Make a new Computer instance:
hal = Computer.new("Dave", 12345)

puts "Current user: #{hal.current_user}"
# @username belongs to the hal instance: it's an instance variable.

puts "Manufacturer: #{$manufacturer}"
# We can get $manufacturer directly: it's a global variable.

puts "Files: #{Computer.display_files}"
# @@files belongs to the Computer class: it's a class variable
```

---

Side note: any given Ruby class can have only one **superclass**.

When you call `super` from inside a method, that tells Ruby to...
1. look in the superclass of the current class and
2. find a method with the same name as the one from which super is called; then
3. if it finds such a method, Ruby will use the superclass' version of the method.

---

A **class method** belongs to the class itself, and for that reason, it's prefixed with the class name:

```ruby
class Computer
 @@users = {}
 
 def initialize(username, password)
   @@users[username] = password 
   @username = username 
   @password = password
   @files = {}
        end
 
 def create(filename)
   time = Time.now
   @files[filename] = time
   puts 'new file created!'
 end
 
 def Computer.get_users
   return @@users
 end

end

my_computer = Computer.new('mr. foo', 'bar code')
```

---

Ruby needs methods in order to access attributes: For instance, if we want to access a `@name` instance variable, we write:

```ruby
class Person

 def initialize(name)
   @name = name
 end

 def get_name
   @name
 end

 def name=(value) # [putting an = sign in a method name] is a Ruby convention saying, "hey, this method sets a value!"
   @name = value
 end

end
```

Alternatively, can use `attr_reader` to access a variable and `attr_writer` to change it:

```ruby
class Person
 attr_reader :name
 attr_writer :name

 def initialize(name)
   @name = name
 end
end
```

Side note: you can use `attr_accessor` to make a variable readable and writeable.

---

## Modules

Modules are very much like classes, only modules can't create instances and can't have subclasses. They're just used to store things.

Like class names, module names are written in CapitalizedCamelCase, rather than lowercase_with_underscores.

It doesn't make sense to include variables in modules, since variables (by definition) change; instead, use a constant. **Ruby constants** are written in ALL_CAPS and are separated with underscores if there's more than one word.

The **double colon** is the scope resolution operator; it tells Ruby where you're looking for a specific bit of code. `Math::PI` tells Ruby to look inside the `Math` module to get that `PI`, not any other `PI`.

To bring in non-default modules, use `require`.

---

You can also `include` a module; any class that includes a certain module can use that module's methods.

When a module is used to add additional behavior and information into a class (thus allowing us to customize a class without having to rewrite code), it's called a **mixin**:

```ruby
module Action
 def jump
   @distance = rand(4) + 2
   puts "I jumped forward #{@distance} feet!"
 end
end

class Rabbit
 include Action ## pull [the Action module] into [the Rabbit class], so we don't have to write 'Action::jump' each time
 attr_reader :name
 def initialize(name)
   @name = name
 end
end

class Cricket
 include Action
 attr_reader :name
 def initialize(name)
   @name = name
 end
end

peter = Rabbit.new("Peter")
jiminy = Cricket.new("Jiminy")

peter.jump
jiminy.jump
```

---

Whereas `include` mixes a module's methods in at the **instance level** (allowing instances of a particular class to use the methods), the `extend` keyword mixes a module's methods at the **class level**. This means that class itself can use the methods, as opposed to instances of the class.

```ruby
# ThePresent has a .now method that we'll extend to TheHereAnd

module ThePresent
 def now
   puts "It's #{Time.new.hour > 12 ? Time.new.hour - 12 : Time.new.hour}:#{Time.new.min} #{Time.new.hour > 12 ? 'PM' : 'AM'} (GMT)."
 end
end

class TheHereAnd
 extend ThePresent
end

TheHereAnd.now
```