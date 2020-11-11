# Javascript Debugging Tips You Probably Didn't Know

### This is an example blog post. See original [here](https://raygun.com/learn/javascript-debugging-tips?utm_medium=newsletter&utm_source=javascriptweekly&utm_campaign=cooperpress&utm_content=article).

![debug](https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f21f75aabe3926a88003f11_js-debugging.png)

## Debugger

After console.log, debugger is my favorite quick and dirty debugging tool. If you place a debugger; line in your code, Chrome will automatically stop there when executing. You can even wrap it in conditionals, so it only runs when you need it.

```
if (thisThing) {    
debugger;}
```

---

## Display objects as a table

Sometimes, you have a complex set of objects that you want to view. You can either console.log them and scroll through the list, or break out the console.table helper. It makes it easier to see what you’re dealing with!

Will output:

![debug](https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f235e7897970a9af238fc01_5eaa4c24076841924ce3f5f4_Debugging-2b.png)

---

## Try all the sizes

While having every single mobile device on your desk would be awesome, it’s not feasible in the real world. How about resizing your viewport instead? Chrome provides you with everything you need. Jump into your inspector and click the toggle device mode button. Watch your media queries come to life!

![debug](https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f235e8b70e96f765748cb45_5eaa4c85fbbd830a55c31d4c_Debugging-1.png)

---

## How to find your DOM elements quickly

Mark a DOM element in the elements panel and use it in your console. Chrome Inspector keeps the last five elements in its history so that the final marked element displays with $0, the second to last marked element $1 and so on. If you mark following items in order ‘item-4′, ‘item-3’, ‘item-2’, ‘item-1’, ‘item-0’ then you can access the DOM nodes like this in the console:

![debug](https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f235e8b5a7f828daf39838c_5eaa4ccfb688d30326ad49a6_Debugging-2.png)

---

## Get the stack trace for a function

You will have a lot of views and be triggering a lot of events, so eventually you will come across a situation where you want to know what caused a particular function call. Since JavaScript is not a very structured language, it can sometimes be hard to get an overview of what happened and when. This is when console.trace (or just trace in the console) comes in handy to be able to debug JavaScript. Imagine you want to see the entire stack trace for the function call funcZ in the car instance on Line 33:

```
var car;
var func1 = function() {
	func2();
}

var func2 = function() {
	func4();
}
var func3 = function() {
}

var func4 = function() {
	car = new Car();
	car.funcX();
}
var Car = function() {
	this.brand = ‘volvo’;
	this.color = ‘red’;
	this.funcX = function() {
		this.funcY();
	}

	this.funcY = function() {
		this.funcZ();
	}

	this.funcZ = function() {
		console.trace(‘trace car’)
	}
}
func1();
var car; 
var func1 = function() {
	func2();
} 
var func2 = function() {
	func4();
}
var func3 = function() {
} 
var func4 = function() {
	car = new Car();
	car.funcX();
}
var Car = function() {
	this.brand = ‘volvo’;
	this.color = ‘red’;
	this.funcX = function() {
		this.funcY();
	}
	this.funcY = function() {
		this.funcZ();
	}
 	this.funcZ = function() {
		console.trace(‘trace car’)
	}
} 
func1();
```

Line 33 will output:

![debug](https://assets-global.website-files.com/5e4bb125419b3343f60a3c85/5f235e8bb28a6cc3a46c5958_5eaa4e0728b2be06967be396_Debugging-4.png)

Now we can see that func1 called func2, which called func4. Func4 then created an instance of Car and then called the function car.funcX, and so on. Even though you think you know your script well this can still be quite handy. Let’s say you want to improve your code. Get the trace and your great list of all related functions. Every single one is clickable, and you can now go back and forth between them. It’s like a menu just for you.

---

##  Watch specific function calls and arguments

In the Chrome console, you can keep an eye on specific functions. Every time the function is called, it will be logged with the values that it was passed in.

```
var func1 = function(x, y, z) {
//....
};
```
---

## Conclusion

There is also a [helpful article that lists JavaScript debugging tools](https://raygun.com/javascript-debugging-tools), if you want to start looking at augmenting your browser tools with outside help. Either way, you should be able to use these tips to get your started debugging your JavaScript code and getting bug-free code ready to deploy and ship!