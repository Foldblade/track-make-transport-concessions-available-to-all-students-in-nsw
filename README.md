# Track "Make transport concessions available to all students in NSW" ePetition

Track the number of ePetition signers. You can view the statistical charts [here](https://foldblade.github.io/track-make-transport-concessions-available-to-all-students-in-nsw/).

![Website](https://img.shields.io/website?url=https%3A%2F%2Ffoldblade.github.io%2Ftrack-make-transport-concessions-available-to-all-students-in-nsw%2F)

---

Sign for [Make transport concessions available to all students in NSW](https://www.parliament.nsw.gov.au/la/Pages/ePetition-details.aspx?q=tabuKTP7hWgVFy0qTdhC7w)!

签署[向新南威尔士州所有学生提供交通优惠](https://www.parliament.nsw.gov.au/la/Pages/ePetition-details.aspx?q=tabuKTP7hWgVFy0qTdhC7w)电子请愿书！

簽署[向新南威爾斯州所有學生提供交通優惠](https://www.parliament.nsw.gov.au/la/Pages/ePetition-details.aspx?q=tabuKTP7hWgVFy0qTdhC7w)電子請願書！

## How to use it (maybe for other ePetitions)

### Development

```
npm run dev
```

### Build

```
npm run build
```

### Github Actions (and how to trigger it)

You may want to change

```
git config --global user.email
git config --global user.name
```

in `.github/workflows/crawler.yml`.

Create a secret named `ACCESS_TOKEN` in your repo's `Settings` - `Security` - `Secrets and Variables` - `Actions` - `Repository secrets` because we need a secret to push changes:

```
      - name: Push changes
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.ACCESS_TOKEN }}
```

For automation, you may want to use Github Actions' `schedule`:

```
on:
  schedule:
    - cron: "*/5 * * * *"
```

But this is so unstable - maybe 15 mins or longer. So my solution is:

Uncomment the following lines in `.github/workflows/crawler.yml`:

```
on:
  repository_dispatch:
    types: [sign]
```

Using crontab (and replace the UPPERCASE_VARIABLES_TO_YOURS) to fetch data every 5 mins:

```
*/5 * * * * /usr/bin/curl --request POST --url 'https://api.github.com/repos/YOUR_USER_NAME/YOUR_REPO_NAME/dispatches' --header 'authorization: Bearer YOUR_REPO_ACCESS_TOKEN' --data '{"event_type": "sign"}'
```

Notice that `--data '{"event_type": "sign"}'` == `repository_dispatch.types`.

`src/data.json5` maybe very large - but fetching every 5 minutes for the last 10 days is still acceptable.

And I don’t know the specific end time of ePetition - seems 1 P.M. of the end date.
