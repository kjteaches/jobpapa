import webbrowser
import urllib.parse

role = "technical writer"
exact = True
time_filter = "qdr:w"  # h12, d, d3, w, w2, m
exclude = ["senior", "onsite"]

sites = {
    "Greenhouse": "boards.greenhouse.io",
    "Ashby": "jobs.ashbyhq.com",
    "Lever": "jobs.lever.co",
    "Workable": "apply.workable.com",
    "Wellfound": "wellfound.com/jobs",
    "Remote OK": "remoteok.com",
    "Startup Jobs": "startup.jobs",
    "DevRel Jobs": "devreljob.com",
}

role_query = f'"{role}"' if exact else role
exclude_query = " ".join(f"-{x}" for x in exclude)

firefox = webbrowser.get(
    'open -na "Firefox" --args --private-window %s'
)

for domain in sites.values():
    query = f"""
        {role_query}
        site:{domain}
        (job OR careers OR apply)
        (remote OR distributed)
        {exclude_query}
    """

    clean_query = " ".join(query.split())

    url = (
        "https://www.google.com/search?q="
        + urllib.parse.quote_plus(clean_query)
        + f"&tbs={time_filter}"
    )

    firefox.open(url)