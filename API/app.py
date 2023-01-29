from itertools import chain, combinations

# Returns the powerset of the list
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

teams = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]]
others = []
current = 0

strengths = {1: 22, 2: 45, 3: 34, 4: 51, 5: 11, 6: 37, 7: 42, 8: 16, 9: 29, 10: 56, 11: 49}
floors = {"A": 43, "B": 81, "C": 73, "D": 54, "E": 97}
# No way preferences by team (starting at 0, so team 1 is 0, team 2 is 1, etc.)
no_ways = {0: [5, 7, 9], 1: [4, 8, 9, 10], 2: [4, 5, 6, 8, 9, 10], 3: [2, 5, 6, 7, 8, 9, 11], 4: [6, 7, 8], 5: [2, 3, 4, 5, 9, 11], 6: [8, 9], 7: [3, 5, 6, 7, 9], 8: [3, 4, 6, 7, 8, 11], 9: [1, 3, 9], 10: [8]}

for i in range(11):
    #temps = map(int, (input(f"No way for team {i + 1}: ").split()))
    temps = no_ways[i]
    for temp in temps:
        try:
            teams[i].remove(temp)
        except:
            continue
        if i + 1 in teams[temp - 1]:
            try:
                teams[temp - 1].remove(i + 1)
            except:
                continue

# single = True
# partner = 0
# while (single):
#     for i in range(11):
#         if i == 10 and len(teams[i]) != 1 and single == True:
#             single = False
#         else:
#             if len(teams[i]) == 1:
#                 partner = teams[i][0]
#                 teams[partner - 1] = [i + 1]

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
            sum = 0
            for element in subset:
                sum += strengths[element]
            if sum > floors[chr(65 + index)] or sum < floors[chr(65 + index)] * 0.25:
                temp_subsets.remove(subset)
        subsets = temp_subsets
        floors_final[index][i] = subsets

    # print(f"FLOOR {chr(65 + index)}")
    # for i in range(11):
    #     print(f"Team {i + 1} can be with {floors_final[index][i]}")
    # print()

print("ALL POSSIBLE FLOOR COMBINATIONS")
for index_floor, floor in enumerate(floors_final):
    print(f"------FLOOR {chr(65 + index_floor)}------")
    for index_team, team in enumerate(floor):
        if team != []:
            for index_combination, combination in enumerate(team):
                print(f"\t{combination}")

