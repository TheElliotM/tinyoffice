from itertools import chain, combinations, product

# Returns the powerset of the list (code taken from itertools documentation)
def powerset(iterable):
    s = list(iterable)
    return list(chain.from_iterable(combinations(s, r) for r in range(len(s)+1)))

# Given a powerset, returns the sets that contain value (the team)
def x(subsets, value):
    temp = subsets[:]
    for subset in subsets:
        if value not in subset:
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
    

teams = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]]
others = []
current = 0

strengths = {1: 22, 2: 45, 3: 34, 4: 51, 5: 11, 6: 37, 7: 42, 8: 16, 9: 29, 10: 56, 11: 49}
floors = {"A": 43, "B": 81, "C": 73, "D": 54, "E": 97}
# No way preferences by team (starting at 0, so team 1 is 0, team 2 is 1, etc.)
no_ways = {1: [5, 7, 9], 2: [4, 8, 9, 10], 3: [4, 5, 6, 8, 9, 10], 4: [2, 5, 6, 7, 8, 9, 11], 5: [6, 7, 8], 6: [2, 3, 4, 5, 9, 11], 7: [8, 9], 8: [3, 5, 6, 7, 9], 9: [3, 4, 6, 7, 8, 11], 10: [1, 3, 9], 11: [8]}
tolerates = {1: [3, 8, 10], 2: [6, 7, 11], 3: [7], 4: [1, 3], 5: [9, 10, 11], 6: [1, 8], 7: [10, 11], 8: [2, 4, 11], 9: [2, 10], 10: [4, 5, 8], 11: [2, 3, 6, 7, 9, 10]}
prefers = {1: [2, 4, 6, 11], 2: [1, 3, 5], 3: [1, 2, 11], 4: [10], 5: [1, 2, 3, 4], 6: [7, 10], 7: [1, 2, 3, 4, 5, 6,], 8: [1, 10], 9: [1, 5], 10: [2, 6, 7, 11], 11: [1, 4, 5]}

for i in range(1, 12):
    #temps = map(int, (input(f"No way for team {i + 1}: ").split()))
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
floors_final = [teams[:], teams[:], teams[:], teams[:], teams[:]] # A, B, C, D, E
subsets = []
temp_floor = []
temp_subsets = []
sum = 0

for index, floor in enumerate(floors_final):
    for i in range(11):
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

    # print(f"FLOOR {chr(65 + index)}")
    # for i in range(11):
    #     print(f"Team {i + 1} can be with {floors_final[index][i]}")
    # print()

all_combinations = []
floor_combinations = []
#print("ALL POSSIBLE FLOOR COMBINATIONS")
for index_floor, floor in enumerate(floors_final):
    #print(f"------FLOOR {chr(65 + index_floor)}------")
    floor_combinations = []
    for index_team, team in enumerate(floor):
        if team != []:
            for index_combination, combination in enumerate(team):
                #print(f"\t{combination}")
                floor_combinations.append(combination)
    all_combinations.append(floor_combinations)

buildings = set(product(*all_combinations))

scores = []

for building in buildings.copy():
    teams_exist = [False, False, False, False, False, False, False, False, False, False, False, False]
    duplicate = False
    space_score = 0
    like_score = 0
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
        if duplicate == True:
            break

    if duplicate == False:
        space_score = space_score / 348
        like_score = like_score_calculation(like_score, building)
        total_score = (space_score ** 2 + like_score ** 2) ** (1/2)
        scores.append(building + (total_score, ))

scores.sort(key = lambda x: x[-1])
print(scores[-1])

# ((7,), (2, 3), (1, 11), (4,), (6, 10), 0.9655172413793104, 2.0)
