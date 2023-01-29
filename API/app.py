from flask import Flask, request
from itertools import chain, combinations, product

app = Flask(__name__)
app.config["DEBUG"] = True

# Returns the powerset of the list (code taken from itertools documentation)
def powerset(iterable):
    s = list(iterable)
    return list(chain.from_iterable(combinations(s, r) for r in range(len(s)+1)))

# Given a powerset, returns the sets that contain the team
def x(subsets, team):
    temp = subsets[:]
    for subset in subsets:
        if team not in subset:
            temp.remove(subset)
    subsets = temp
    return subsets

def like_score_calculation(like_score, building):
    count = 0
    for floor in building:
        count += len(floor) * (len(floor) - 1) / 2
    if count == 0:
        return 0
    else:
        return (like_score / count) / 2 

@app.route("/generate", methods = ["GET"])
def generate():

    # "floors": [
    #     {
    #         "id": TK,
    #         "name": "TK",
    #         "capacity": TK
    #     },
    #     {
    #         ...
    #     }
    # ]
    # "teams": [
    #     {
    #         "id": TK,
    #         "name": "TK",
    #         "strength": TK,
    #         "preferred": TK,
    #         "noway": TK
    #     },
    #     {
    #         ...
    #     }
    # ]

    request_data = request.get_json(force = True)
    request_teams = request_data["floors"]
    request_floors = request_data["teams"]

    num_teams = len(request_teams)
    teams = [list(range(1, num_teams + 1))] * num_teams
    strengths = {team: strength for (team, strength) in (teams, request_teams[team - 1]["strength"])}
    prefers = {team: prefer for (team, prefer) in (teams, request_teams[team - 1]["preferred"])}
    no_ways = {team: no_way for (team, no_way) in (teams, request_teams[team - 1]["noway"])}

    num_floors = len(request_floors)
    floors = {floor: capacity for (floor, capacity) in (list(range(1, num_floors + 1)), request_floors[floor - 1]["capacity"])}
    total_space = sum(floors.values())

    print(f"request_data: {request_data}")
    print()
    print(f"request_teams: {request_teams}")
    print()
    print(f"request_floors: {request_floors}")
    print()
    print(f"num_teams: {num_teams}")
    print(f"teams: {teams}")
    print(f"strengths: {strengths}")
    print(f"prefers: {prefers}")
    print(f"no_ways: {no_ways}")
    print()
    print(f"num_floors: {num_floors}")
    print(f"floors: {floors}")
    print(f"total_space: {total_space}")

    for i in range(1, num_teams):
        nos = no_ways[i]
        for no in nos:
            try:
                teams[i - 1].remove(no)
            except:
                continue
            if i in teams[no - 1]:
                try:
                    teams[no - 1].remove(i)
                except:
                    continue

    # floors_final is the list of all possible teams on all floors
    # floors_final[index] is the list of all possible teams on the indexth floor (starting from index = 0)
    # floors_final[index][i] is the list of all possible teams on the indexth floor for the ith team (starting from index = 0, i = 0)
    floors_final = [teams[:]] * num_floors
    subsets = []
    temp_floor = []
    temp_subsets = []
    sum = 0

    for index, floor in enumerate(floors_final):
        for i in range(num_teams):
            temp_floor = floors_final[index][i]
            subsets = x(powerset(temp_floor), i + 1)
            temp_subsets = subsets[:]
            for subset in subsets:
                invalid = False
                sum = 0
                for element in subset:
                    sum += strengths[element]
                    if element in chain(*[no_ways[temp] for temp in subset]):
                        invalid = True
                if invalid == True or sum > floors[chr(65 + index)] or sum < floors[chr(65 + index)] * 0.25:
                    temp_subsets.remove(subset)
                    invalid = False
            subsets = temp_subsets
            floors_final[index][i] = subsets

        # print(f"FLOOR {index}")
        # for i in range(num_teams):
        #     print(f"Team {i + 1} can be with {floors_final[index][i]}")
        # print()

    all_combinations = []
    floor_combinations = []
    #print("ALL POSSIBLE FLOOR COMBINATIONS")
    for floor in floors_final:
        #print(f"------FLOOR {index_floor}------")
        floor_combinations = []
        for team in floor:
            if team != []:
                for combination in team:
                    #print(f"\t{combination}")
                    floor_combinations.append(combination)
        all_combinations.append(floor_combinations)

    buildings = set(product(*all_combinations))

    scores = []

    for building in buildings.copy():
        teams_exist = [False] * num_teams
        duplicate = False
        space_score = 0
        like_score = 0
        number_score = 0
        total_score = 0
        for floor in building:
            for team in floor:
                if teams_exist[team - 1] == True:
                    buildings.remove(building)
                    duplicate = True
                    break
                else:
                    teams_exist[team - 1] = True
                    space_score += strengths[team]
                    if team in chain(*[prefers[temp] for temp in floor]):
                        like_score += 1
                    number_score += 1
            if duplicate == True:
                break

        if duplicate == False:
            space_score = space_score / total_space
            number_score = number_score / num_teams
            like_score = like_score_calculation(like_score, building)
            total_score = (space_score ** 2 + number_score ** 2 + like_score ** 2) ** (1/2)
            scores.append(building + (space_score, number_score, like_score, total_score))

    scores.sort(key = lambda x: x[-1])
    print(scores[-1])

    # ((7,), (2, 3), (1, 11), (4,), (6, 10), 0.9655172413793104, 0.7272727272727273, 1.0, 1.5688050112220524)

@app.route("/save", methods = ["POST"])
def save():
    pass

@app.route("/load", methods = ["GET"])
def load():
    pass

if __name__ == '__main__':
    app.run(debug=True)