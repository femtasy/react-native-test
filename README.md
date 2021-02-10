## Introduction
As 90% of mobile applications are just about displaying lists of data fetched from APIs, we decided in our exercise to reflect this common use case ;)

The focus here is on the way you structure the code and architecture the UX, reflecting different possible states of the data: fetching, displaying, errors, etc. You don't need to worry much about the visual design here, anything readable is okay with us. We understand that there's not much time to polish the looks.

Whenever in doubt about your solution, ask yourself: is that something that I'd be comfortable making my colleagues read (review) and later release to the App Store?


## Task requirements
What you get as a starting point is an application that fetches and displays the latest [XKCD comic strip](https://xkcd.com/). What we'd like you to do is extend it, so that instead of just the single latest strip it'll display a list of them: starting from the latest one, sorted by publication date descending, automatically fetching more content as we scroll to the end.

Every list element should display the title of the strip and a thumbnail of the image. Tapping the element allows the user to see it fullscreen (either by navigating to a different view, or overlaying the screen with the full image).

Keep in mind that although the task is basic and we don't care about the visual design, there are things we do strongly care about:
* The user's experience when fetching data: error handling, loading states, etc.
* How clean the code is: imagine you'll be handing off this code to a colleague, because you're going on holidays and they'll need to build up on it
* Long-term: we care that the solutions you implement will be scalable and maintainable even as both the application's scope and team size grow

Make sure that the code you're sending to us is code that you're happy to defend during an in-depth technical interview at later stage of the recruiting process.


## Deliverables
We expect to receive either a link to a repository, fork, or a zipped file containing a git repository with your solution for this exercise.


## Extra information
If you have any libraries that you like to use, feel free to use them here as well. We're always interested in learning what tools other people use.
