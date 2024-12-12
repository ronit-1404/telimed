# telimed

Steps to Contribute
Navigate to the Repository:
Open the private repository on GitHub.
Fork the Repository:
Click the Fork button in the top-right corner of the repository page.
The forked repository will now appear in the member’s own GitHub account under their repositories.

Copy the Repository URL:
Go to the forked repository.
Click on the green Code button and copy the URL (choose HTTPS ).
Clone the Fork Locally:
Open a terminal or Git Bash and run:
  git clone <your-fork-url>
Navigate into the cloned repository:
  cd <repository-name>

 Set Up a Remote to the Original Repository
Add the Original Repository (Upstream):
Run the following command to add a remote for the original repository:
git remote add upstream <original-repo-url>
Verify Remotes:
git remote -v

Create a New Branch
Checkout a New Branch for Changes:
Run the following command to create and switch to a new branch:
git checkout -b <branch-name>

 Make Changes and Commit
Make Changes Locally:
Use your preferred editor or IDE to make changes to the codebase.
Stage and Commit Changes:
Stage changes:
  git add .
  git commit -m "Describe your changes"

Push the Changes to Fork
Push to Your Fork:
Push the changes to the forked repository.
  git push origin <branch-name>

Create a Pull Request
Go to the Forked Repository on GitHub:
Navigate to the forked repository on GitHub.
Click "Compare & pull request":
GitHub usually suggests creating a pull request for recently pushed branches. Click Compare & pull request.
Fill Out Pull Request Details:
Add a title and description for your changes.
Ensure the base repository is the original repository and the base branch is the main branch.
Submit the Pull Request:
Click Create pull request.



