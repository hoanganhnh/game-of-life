
Open a terminal and run the following git command:

```
git clone "url you just copied"
```

## Create a branch

Now create a branch using the `git checkout` command:

```
git checkout -b your-new-branch-name
```

For example:

```
git checkout -b hoanganh
```

## Make necessary changes and commit those changes


Add those changes to the branch you just created using the `git add` command:

```
git add name-file-change
```

Now commit those changes using the `git commit` command:

```
git commit -m "Add <your-name> to Contributors list"
```

replacing `<your-name>` with your name.

## Push changes to GitHub

Push your changes using the command `git push`:

```
git push origin <add-your-branch-name>
```

replacing `<add-your-branch-name>` with the name of the branch you created earlier.
