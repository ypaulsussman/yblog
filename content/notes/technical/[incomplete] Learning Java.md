# Learning Java

## Chapter 2: A First Application

```java
public class HelloJava {
  public static void main( String[] args ) { ...}
}
```
  - Running a Java application means picking a particular class and passing its name as an argument to the Java virtual machine. 
    - The java command then looks in our `HelloJava` class to see if it contained the special method named `main()`
    - If it were absent, we would receive an error message.
  - `String [] args` allows us to pass command-line arguments to the application.
  - `void` indicates the method doesn't return any value to its caller.
  - `public` indicates it can be invoked by methods in classes other than `HelloJava`. (A method or variable declared as `private` is accessible only from its own class.)

```java
JFrame frame = new JFrame("Hello, Java!");
```
  - The `new` keyword tells Java to allocate memory and actually create a particular `JFrame` object.
  - Variables that have class types don’t so much contain objects as point to them. 
    - Class-type variables are _references_ to, or pointers to, an object. 
    - If you declare a class-type variable without assigning it an object, it’s assigned the default value of `null`. 
    - If you try to use a variable with a `null` value as if it were pointing to a real object, a runtime error, `NullPointerException` , occurs.
  
```java
import javax.swing.*;
```
  - This tells the compiler that we are going to be using classes from a Java package called `javax.swing` 
    - Classes in the same package have special access privileges with respect to one another and may be designed to work together closely.
    - Packages are named in a hierarchical fashion with dot-separated components.
    - The dot-star notation indicates that the entire package should be imported.
    - Classes in a package take on the name of the package as part of their "_fully qualified name._"
    - Alternatively, you can use the FQN directly, in lieu of the `import` statement:
    ```java
    public class HelloComponent extends javax.swing.JComponent {...}
    ```
  - Imports are not recursive.
      - Importing `java.awt.*` doesn’t automatically import the `event` package. 
      - Instead, you need to explicitly import `java.awt.event`
  - The `java.` and `javax.` package hierarchies are special. 
    - Any package that begins with `java.` is part of the core Java API and is available on any platform that supports Java.
    - The `javax.` package normally denotes a standard extension to the core platform, which may or may not be installed. 
    - However, in recent years, many standard extensions have been added to the core Java API without renaming them.

```java
int messageX = 125, messageY = 95;
String theMessage;
```
  - Instance variables are always visible to (and usable by) all the methods inside their class.
  - Unless otherwise initialized... 
    - `Numeric` types are set to `0` , 
    - `char` types are set to the null character (`\0`)
    - `Boolean` variables are set to `false` , and 
    - class-type variables are set to `null`.
  - Instance variables differ from variables that are declared inside the scope of a particular method (local variables.)
    - These are effectively private variables that can be seen only by code inside a method or other code block. 
    - Java doesn’t initialize local variables, so you must assign values yourself. 
    - If you try to use a local variable that has not yet been assigned a value, your code generates a compile-time error. 
    - Local variables live only as long as the method is executing and then disappear.

```java
HelloComponent2 newObject = new HelloComponent2("Hello, Java!");
```
  - `new` denotes a constructor method, which sets up a new instance of a class. 
    - Java allocates storage for the new object, 
    - sets instance variables to their default values, and 
    - calls the constructor method for the class to do whatever application-level setup is required.
  - A constructor always has the same name as its class.
  - Constructors don’t have a return type, but you can think of them as creating an object of their class’s type.
  - To consume initializing variables from the command-line, you can change the constructor to take:
  ```java
  HelloComponent2 newobj = new HelloComponent2( args[0] );
  ```
  then pass in the text as you run the application:
  ```bash
  $ java HelloJava2 "Hello, Java!"
  ```

```java
public HelloComponent2(String message) {
theMessage = message;
addMouseMotionListener( this );
}
```
  - `this` is a special, read-only variable that explicitly refers to the “current” object context.
    - A method can use `this` to refer to the instance of the object that holds it. 
    - The following two statements are therefore equivalent: `theMessage = message;` or: `this.theMessage = message;`
      - We normally use the shorter, implicit form to refer to instance variables
      - However, we need `this` when we explicitly pass a reference to our object to a method in another class. 
      - We often do this so that methods in other classes can invoke our public methods or use our public variables.
  - Java GUI components generate events from user-actions; other objects can then ask to receive those events by registering a listener with the event source.
    - If there are no listeners for a particular kind of event, Java won’t even generate it, for efficiency's sake.
    - To declare that a listener wants to receive a component’s mouse-motion events, you... 
      - invoke that component’s `addMouseMotionListener()` method, and
      - specify the listener object as its argument. 
    - In this case, the component... 
      - is calling its own `addMouseMotionListener()` method, 
      - with the argument `this`, 
      - meaning “I want to receive _my own_ mouse-motion events.”

- We can use the `repaint()` method of the `JComponent` class to request that our component be redrawn: we can’t call `paintComponent()` directly.
  - The Java system has a separate, dedicated thread of execution that handles all `repaint()` requests. 
    - It can schedule and consolidate `repaint()` requests as necessary.
    - This helps to prevent the windowing system from being overwhelmed during paint-intensive situations like scrolling. 
  - In addition, because all painting functionality must be encapsulated through our `paintComponent()` method, we aren’t tempted to spread it throughout the application.

- How does the system know to call `mouseDragged()` when a mouse event occurs?
  - It implements an interface:
  ```java
  class HelloComponent2 extends JComponent implements MouseMotionListener {
  ```
  - In Java, an interface is a list of methods that the class *must* have.
    - If you don’t provide the specified methods, a compilation error will occur.
    - An interface doesn’t say what these methods have to do, though.
    - Interfaces give us a way of acting on objects based on their capabilities, without knowing or caring about their actual type.
    - A class in Java can `extend` only one class, but can `implement` as many interfaces as it wants.
  - This particular interface requires our class to have methods called `mouseDragged()` and `mouseMoved()`
    - It does say that the methods must [1] take a `MouseEvent` as an argument and [2] return no value.
    - NB `mouseMoved()` doesn’t actually do anything; it's only present because it's specified by the interface.
  - You can also refer to an object by an interface name.
    - A method could return an e.g. `MouseMotionListener` interface, or take the interface as an argument. 
    - When you do this in this way, it means that:
      - you don’t care about the object’s actual _class_; 
      - the only requirement is that the class implements that _interface_. 
    - `addMouseMotionListener()` is an example.
      - Its argument must be an object that implements the `MouseMotionListener` interface. 
      - The argument we pass is `this`, the `HelloComponent2` object itself. 
      - It could be a `Cookie`, an `Aardvark`, or any other class we dream up. 
      - As long as it implements `MouseMotionListener` (and thus defines the interface's two listed methods), it'll work.

## Chapter 3: Tools of the Trade

- A Java virtual machine (VM) implements the Java runtime system. 
  - It performs all the runtime activities needed to execute Java applications.
    - It loads Java class files, verifies classes from untrusted sources, and executes the compiled bytecode. 
    - It manages memory and system resources. 
    - Good implementations also perform dynamic optimization, compiling Java bytecode into native machine instructions.
  - The JVM can be 
    - a standalone application like the `java` command that comes with the JDK, or 
    - built into a larger application like a web browser.
  - Usually the interpreter itself is a native application, supplied for each platform, which then bootstraps other tools written in the Java language. 
  - Tools such as Java compilers and IDEs are often implemented directly in Java to maximize their portability and extensibility. 

- To run an application, start the VM with that class as an argument: `$ java [interpreter options] class_name [program arguments]`
  - A standalone Java application must have at least one class containing a method called `main()` 
    - The `main()` method must have the right _method signature:_ the method’s name, arguments, and return type, as well as type and visibility modifiers. 
    - The `main()` method must be a `public`, `static` method that takes an array of `String` objects as its argument and does not return any value: `public static void main ( String [] myArgs )`
  - The interpreter searches for that class in the _classpath_, a list of directories and archive files where classes are stored.
    - An element of the classpath can be a directory or a JAR file.
    - The classpath can be specified either by an environment variable or with the  command-line option `-classpath`. 
      - If both are present, the command-line option is used.
      - On a Unix system, you set the `CLASSPATH` environment variable with a colon-separated list of directories and class archive files:
        - `$ export CLASSPATH=/home/userUno/Java/classes:/home/userDeux/lib/foo.jar:.`
        - This example specifies a classpath with three locations: a directory in the user’s home, a JAR file in another user’s directory, and the current directory, which is always specified with a dot.
        - (It's useful to include the current directory for when you are tinkering with classes.)
    - As of Java 9, you can use modules as an alternative to classpath
- Alternately, the `java` command can be used to launch an “executable” Java archive (JAR) file: `$ java -jar spaceblaster.jar`
  - The JAR file includes metadata with the name of the startup class containing the `main()` method.
  - The classpath becomes the JAR file itself.
  - JARs are simple archives that include extra files (metadata) that describe each archive’s contents. 
    - The archive format enables large groups of classes and their resources to be distributed in a single file.
    - The Java runtime then will automatically extract individual class files from the archive during execution as needed.
  - JAR files are created with the JDK’s `jar` utility.
    - JAR and ZIP are really the same format.
    - You can put whatever you want into a JAR file: Java class files, serialized objects, data files, images, audio, etc. 
    - A JAR file can also carry one or more digital signatures that attest to its integrity and authenticity.

- For application configuration, reading host environment variables is discouraged.
- Instead, for runtime config, Java apps tend to use files, network configuration, or system properties.
- _System properties_ are name-value string pairs; they're a more structured and portable alternative to command-line arguments.
  - Each system property is passed to the interpreter on the command line using the `-D` option followed by `name=value`: 
  - `$ java -Dstreet=sesame -Dscene=alley animals.birds.BigBird`
  - The value of the `street` property is then accessible via the static `System.getProperty()` method: 
  - `String street = System.getProperty("street");`

- The `javap` command will print a description of a compiled class.
  - You don’t need to know exactly where it is, only that it is in your classpath. 
  - This is very useful if you don’t have other documentation handy and can also be helpful in debugging classpath problems. 
  - Using javap, you can determine...
    - whether a class is in the classpath, and 
    - possibly even which version you are looking at (many classpath issues involve duplicate classes in the classpath).
  - `javap` with the `-c` option will also print the JVM instructions for each method in the class.

- `javac` turns Java source code into a compiled class that contains Java bytecode. 
  - By convention, source files are named with a `.java` extension; the compiled class files have a `.class` extension. 
    - Each source code file is considered a single compilation unit. 
    - Classes in a given compilation unit share certain features, such as package and import statements.
  - `javac` allows one public class per file and insists that the file has the same name as the class. 
    - A single file can contain multiple classes, as long as only one of the classes is public and is named for the file.
    - Avoid packing too many classes into a single source file. 
  - Unlike the Java interpreter, which takes just a class name as its argument, javac needs a filename (with the `.java` extension.)
    - `$ javac BigBird.java` produces the class file `BigBird.class` in the same directory as the source file. 
    - You can use the `-d` option with `javac` to specify an alternative directory for storing the class files `javac` generates.
  - By default, `javac` checks only source files that are referenced directly from other source files. 
    - If you have an out-of-date class file that is referenced only by an up-to-date class file, it may not be noticed and recompiled. 
    - For that and other reasons, most projects use a tool such as Gradle to manage builds, packaging, and more.

- `jshell` is a REPL

- More about `jar`
  - Java has an archive format called Pack200, which is optimized for Java bytecode and can achieve 4x greater compression of Java classes than zip alone.
    - It was popular for delivering applets around the web, 1-2 decades ago, but is now rarely used.
    - Their file extension is `.pack.gz`
  - The CLI syntax is somewhat unintuitive.
    - For the flags:
      - The letters `c` , `t` , and `x` tell `jar` whether it is creating, listing, or extracting an archive. 
      - The `v` flag tells `jar` to be verbose when displaying information.
      - The `f` means that the next argument is the name of the JAR file on which to operate. 
    - Subsequent items on the command line  are taken as names of archive items. 
      - If you’re creating an archive, the files and directories you list are placed in it. 
      - If you’re extracting, only the filenames you list are extracted from the archive. (If you don’t list any files, `jar` extracts everything in the archive.)
    - As examples:
      - `jar -cvf jarFile path ` -- create `jarFile` containing `path`(s).
      - `jar -tvf jarFile [ path ]` -- list the contents of `jarFile`, (optionally) showing just `path`(s).
      - `jar -xvf jarFile [ path ]` -- extract the contents of `jarFile`, (optionally) extracting just `path`(s).
  - The `jar` command automatically adds a directory called `META-INF` to our archive. 
    - This directory holds files describing the contents of the JAR file. 
    - It always contains at least one file: `MANIFEST.MF`; this file contains...
      - a “packing list” naming the files in the archive, and
      - a user-definable set of attributes for each entry.
      - To add this information to the manifest in our archive, 
        - place it in a file called e.g. `myManifest.mf`, and
        - create using the `-m` flag command: `$ jar -cvmf myManifest.mf spaceblaster.jar spaceblaster`
        - NB the required order of files (first `.mf` for `-m`, then `.jar` for `-f`)
    - A running application can import manifest information using the `java.util.jar.Manifest` class.
  - Adding a `Main-Class` key to your manifest file allows you to specify the class with the initial `main() `method; you can then run the application without first extracting it:`$ java -jar spaceblaster.jar`

## Chapter 4: The Java Language

- Java data types fall into two categories. 
  - _Primitive types_ represent simple values that have built-in functionality in the language, such as numbers, booleans, and characters.
  - _Reference types_ (or class types) include objects and arrays; they are called reference types because they “refer to” a large data type that is passed “by reference.” 

- Primitive types
  - Eight subtypes:
    - `boolean` (logical value) `true` or `false`
    - `char` (16-bit, Unicode character) 64K characters
    - `byte` (8-bit, signed, two’s complement integer) -128 to 127
    - `short` (16-bit, signed, two’s complement integer) -32,768 to 32,767
    - `int` (32-bit, signed, two’s complement integer) -2.1e9 to 2.1e9
    - `long` (64-bit, signed, two’s complement integer) -9.2e18 to 9.2e18
    - `float` (32-bit, IEEE 754, floating-point value) 6-7 significant decimal places
    - `double` (64-bit, IEEE 754) 15 significant decimal places
  - The major advantage of treating primitive values as special is that the Java compiler and runtime can more readily optimize their implementation.

- Reference types
  - Each new class also serves as a new type: if you create a class called `Foo`, you are also implicitly creating a new type called `Foo`.
  - Because child classes inherit all of the functionality of their parent, an object of the child’s type is an extension of the parent type, and can be used in its place. 
    - For example, if you create a new class, `Cat`, that extends `Animal`
    - objects of type `Cat` can be used anywhere an object of type `Animal` can be used, and
    - an object of type `Cat` is assignable to a variable of type `Animal`.
  - You can use the `var` keyword in conjunction with the declaration/intiation of a variable to let the compiler infer the correct type:
  ``` java
  > class Foo {}
  // created class Foo
  > Foo myFoo = new Foo()
  // myFoo ==> Foo@728938a9
  > var myFoo = new Foo()
  // myFoo2 ==> Foo@6433a2
  ```
  - Two special kinds of reference types — _arrays_ and _interfaces_ — specify the type of object they point to differently.
    - Arrays are a special kind of object automatically created to hold a collection of some other type of object, known as the base type. 
    - Interfaces are a bit sneakier. 
      - An interface defines a set of methods and gives it a corresponding type. 
      - An object that implements the methods of the interface can be referred to by that interface type, as well as its own type. 
      - Variables and method arguments can be declared to be of interface types, just like other class types, and any object that implements the interface can be assigned to them.
  - Generic types/methods (or "parameterized types") are also reference types.
    - They define and operate on objects of various types while providing compile-time type safety. 
    - For example, a `List<String>` is a `List` that can only contain `String`s.


- Java _statements_ appear inside methods and classes. 
  - Statements generally do one of four things: 
    - gather input to assign to a variable, 
    - write output (to your terminal, a `JLabel` , etc), 
    - make a decision about which statements to execute, or 
    - repeat one or more other statements.
  - Examples include:
    - variable declarations and assignments, 
    - basic language structures such as `if`/`then` conditionals and loops.
- Java _expressions_ produce values.
  - An expression is evaluated to produce a result that is then used as part of another expression or in a statement.
  - Method calls, object allocations, and mathematical expressions are examples of expressions.

- The Java `for`-statement can take two different sets of arguments:
  - The typical `for` style:
    ```java
    for ( int i = 0; i < 100; i++ ) {
      System.out.println( i );
    }
    ```
  - The “enhanced `for`-loop” (more like a `forEach`):
    ```java
    int [] arrayOfInts = new int [] { 1, 2, 3, 4 };
    for( int i : arrayOfInts )
      System.out.println( i );

    // or
    List<String> list = new ArrayList<String>();
      list.add("foo");
      list.add("bar");
    for( String s : list )
      System.out.println( s );
    ```

- (Sidebar: good definition of side effects, as "_the work an expression does aside from producing a value._")
  
- Objects always have one (or more!) constructors (a method that always has the same name as the class.)

- `instanceof` is an operator, like `+` or `!=`. (Note that the value `null` is not considered an instance of any class, and will always return `false`.)

- A Java array is an instance of a special `array` class, and has a corresponding type in the type system. 
  - To use an array, as with any other object, we first declare a variable of the appropriate type and then use the `new` operator to create an instance of it:
  ```java
  int [] arrayOfIntegers;  // preferred
  int arrayOfIntegers [];  // C-style  
  Button [] someButtons;  // works for reference types, too
  ```
  - Java lets us use the `[]` operator to access array elements.
  - Java provides a corresponding special form of the `new` operator that lets us either
    - construct an instance of an `array` with a specified length, using the `[]` notation:
    ```java
    int [] someNumbers = new int [20];
    Component [] widgets = new Component [12];
    ```
    - or initialize the instance directly from a structured list of values, without using the `new` keyword:
    ```java
    int [] primes = { 2, 3, 5, 7, 7+4 };
    String [] verbs = { "run", "jump", someWord.toString() };
    ```
  - In Java, a newly allocated array of objects actually contains only reference variables, each with the value `null` (unlike in many other languages, wherein the act of creating an array is the same as allocating storage for its elements.)

- `length` is the only accessible field of an array; it is a variable, not a method.

## Chapter 5: Objects in Java

- A class... 
  - can contain methods, variables, initialization code, and other classes. 
  - can be bundled in packages with related classes to describe a more complex idea (every class belongs to some package.)
  - can be related to other classes by extension, or to interfaces by implementation.

- `Object` is the foundational class at the heart of every other class in Java. 
  - It is part of the core Java package, `java.lang`

- An instance is a runtime object (an individual copy) that implements a class' structure.
  ```java
  Apple a1;
  a1 = new Apple();

  Apple a2 = new Apple();
  ```
  - The declaration of the variable `a1` doesn’t create an `Apple` object.
  - It creates a variable that _can_ refer to an object of type `Apple`. 
  - You can combine this with creating a new object steps into a single line, as in `a2`.

- Aside: the only way you've found to run any `ch05` classes which reference classes inside other files:
  ```bash
  ch05 $ javac PrintAppleDetails4.java
  ch05 $ java ch05.PrintAppleDetails4
  ```
  - Update: with errors in `ch011` resolved, the VSCode `run` command now works. 
  - Still unsure if there _is_ an e.g. `node` or `ruby` analogue that can handle file imports, though.

- Methods always specify a return type (a primitive, a reference, or `void`.)

- If a method is executing concurrently in different threads, each thread has its own version of the method’s local variables. 

- Shadowing:
  - If a local variable/method-arg and an instance variable have the same name, the local variable "shadows" (hides/covers) the ivar within the scope of the method:
    ```java
    class Apple {
      int x, y;
      //...
      public void moveTo(int x, int y) {
        // can't assign e.g. arg x to ivar x
      }
    }
    ```
  - You can get around shadowing by using `this`: 
    ```java
    class Apple {
      int x, y;
      // ...
      public void moveTo(int x, int y) {
        this.x = x;
        this.y = y;
      }
      // ...
    }
    ```

- Static methods (class methods)
  - Belong to the class, rather than individual instances of the class. 
  - They can be called from instances, syntactically just like instance methods, but can also be used independently.
  - They can be invoked by name, through the class name, without any objects instantiated.
  - They can only access static variables and other static methods.

- Argument Passing: in the following example...
  ```java
  void myMethod( int j, SomeObject o ) {
    // do stuff 
  }

  int i = 0;
  SomeObject obj = new SomeObject();

  myMethod( i, obj );
  ```
  - `i` is a primitive, and thus passed by value.
    - when the method is called, the value of `i` is copied into the method’s parameter (a variable local to it) named `j` 
    - If `myMethod()` changes the value of `j`, it only affects its local variable.
  - `obj` is an object, and thus passed by reference.
    - A copy of the reference to `obj` is placed into the reference variable `o`
    - Both references refer to the same object, so any changes made through either reference affect the same object-instance. (Changing `o.size` is visible both as `o.size`, inside `myMethod()`, and as `obj.size`, in the calling method.)
    - However, if `myMethod()` changes `o`'s actual reference, to point to another object, it only affects the local variable
    - This is like passing a pointer in C, and unlike passing by reference in C++.

- Wrapper classes
  - An instance of a wrapper class encapsulates a single value of its corresponding primitive (or `void`!) type.
  - You construct them similarly to JavaScript:
    ```java
    Float pi = new Float( 3.14 );
    Float pi = new Float( "3.14" );
    ```
  - The most common usage for wrappers to pass a primitive value to a method that requires an object (like the the Java Collections API.)

- Method overloading is the process of creating methods that act in the same way on different types of arguments. 
  - This creates the illusion that a single method can operate on many types of arguments.
  - Common examples include `print` and `+`

- A constructor is a special type of method.
  - It has... 
    - the same name as its class, and 
    - no return type.
  - They can be overloaded.
  - They are not inherited.
  - They cannot be declared `abstract`, `synchronized`, or `final`.
  - They can be declared with visibility modifiers (`public`, `private`, `protected.`)

- Packages
  - Packages use all lowercase names (by convention)
  - Third-party libraries are usually organized by the “reverse domain name”  of the company or individual’s email address (e.g.`org.mozilla.somepackage`)

- Method visibility (outside a class)
  - `private` -- none
  - (_No modifier / default_) -- classes in the package
  - `protected` -- classes in the package; subclasses in or outside the package
  - `public` -- all classes

- Maven is great for managing large projects with many dependencies. Gradle is based on Maven's success.

- instances of a subclass can be used anywhere instances of the parent class are allowed:
  ```java
  Cat simon = new Cat("tabby", "shorthair", 12);
  Animal currentPatient = simon;
  ```

- Method overriding
  - A subclass can define additional overloaded methods that add to the methods provided by a superclass.
  - In addition, a subclass can define a method that has exactly the same method signature (name and argument types) as a superclass method. 
    - In that scenario, the subclass method _overrides_ the superclass method, effectively replacing its implementation.
    - Accessing a shadowed variable through an `Animal` reference would find the implementation from the `Animal` class, not the `Cat` class; overriden methods, however, always reference the class furthest down the hierarchy:
      ```java
      Cat simon = new Cat("tabby", "shorthair", 12);
      Animal currentPatient = simon;
      int currentWeight = currentPatient.weight // accesses `Animal weight`, even if `Cat` redefines the variable w/ e.g. a different type
      currentPatient.sleep() // accesses `Cat sleep()`
      ```
  
- Interfaces
  - Interface types act like class types:
    - You can declare variables to be of an interface type.
    - You can declare arguments of methods to accept interface types.
    - You can specify that the return type of a method be a specific interface type. 
  - In each above case, object that implements the interface can then fill that role. 
  - Interfaces cut across the boundaries of what an object is, and deal only in terms of what it can do. 
  - A class can implement as many interfaces as it desires.
  - You define an interface with the `interface` keyword, and list its methods with no bodies, just signatures:
    ```java
    interface Driveable {
      boolean startEngine();
      void stopEngine();
      float accelerate( float acc );
      boolean turn( Direction dir );
    }
    ```
  - The methods of an interface are always considered `public`
  - It’s common to name interfaces after their capabilities, e.g. `Driveable`, `Runnable`, or `Updateable`.

- Inner Classes
  - Classes in Java can be declared at any level of scope (i.e. within any set of curly braces.)
  - Inner classes belong to another class or method; they're essentially nested classes.
  ```java
  Class Animal {
    Class Brain {
      // ...
    }
    void performBehavior() {
      // ...
    }
  }
  ```
  - NB that, underneath, they're syntactic sugar: the compiler maps them to regular Java classes.
  - Anywhere within `Animal`, we can refer to `Brain` and `performBehavior()` directly: and
    - just as the `performBehavior()` method can work with the `Brain` class and create instances of `Brain`, 
    - methods within the `Brain` class can invoke the `performBehavior()` method of `Animal`.
  - A `Brain` object cannot live outside of an _enclosing instance_ of an `Animal` object: any instance of `Brain` will be tethered to an instance of `Animal`.


- Anonymous Inner Classes
  - In Java, _anonymous inner classes_ play part of the role of closures in other languages: they allow for handling state and behavior independently of classes.
  - Anonymous inner classes are an extension of the syntax of the `new` operation. 
  - When you create an anonymous inner class, you combine a class declaration with the allocation of a single instance of that class.
  - After the `new` keyword, you specify either the name of a class or an interface, followed by a class body. 
  - The class body becomes an inner class, which either 
    - extends the specified class or, 
    - in the case of an interface, implements the interface. 
  - A single instance of the class is created and returned as the value:
  ```java
  public class HelloJava3 extends JFrame {
    public static void main(String[] args) {
      HelloJava3 demo = new HelloJava3();
      // ...
    }

    public HelloJava3() {
      super( "HelloJava3" );
      add( new HelloComponent3("Hello, Inner Java!") );
      // ...
    }

    // inner class: `HelloComponent3`
    class HelloComponent3 extends JComponent {
      // ...

      public HelloComponent3( String message ) {
          // ...
          // anonymous inner class: `new MouseMotionListener()`
          addMouseMotionListener(new MouseMotionListener() {
            // ...
          });
      }
      // ...
    }
  }
  ```

## Chapter 6: Error Handling and Logging