var documenterSearchIndex = {"docs":
[{"location":"pages/tes_problem.html#Thermal-Energy-Storage-Problem","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"","category":"section"},{"location":"pages/tes_problem.html#Description","page":"Thermal Energy Storage Problem","title":"Description","text":"","category":"section"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"Water returns from the district at T_textdhret with a constant flow q_textdh and is mainly heated in the waste heat boiler (WHB). Heat supply to WHB Q_textwhb fluctuates, thus an additional boiler that uses fossil fuel (PHB) is also necessary for periods when heat demand is higher than the supply to WHB. However, to minimize fuel consumption, an energy storage tank (TES) can be used to store energy when supply is higher than demand and this energy can be later used when Q_textwhb is not sufficient. The goal here is to find an operation that minimizes Q_textphb given a profile of Q_textwhb for a time period. A scheme of this problem is presented below. ","category":"page"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"(Image: tes_scheme)","category":"page"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"Here q_A and q_B correspond, respectively, to the flow associated with charging and discharging the energy storage tank (TES). Note that volume V_texttes is constant, which means that if, for example, TES is discharging, there is a flow equals to q_A of water that returned from the district going straight to TES. ","category":"page"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"Mathematically, the problem is modeled as","category":"page"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"    beginaligned\n        min_xuz quad int Q_textphb^2 dt \n         textst quad fracdT_texttesdt = fracq_textAV_texttes(T_textA - T_texttes) + fracq_textBV_texttes(T_textB - T_texttes) \n                           fracdT_textphbdt = fracq_textdhV_textphb(T_textC - T_textphb) + fracQ_textphbV_textphbrho_textdhCp_textdh \n                           fracdT_textwhbdt = fracq_textwhbV_textwhb(T_textA - T_textwhb) + fracQ_textwhbV_textwhbrho_textdhCp_textdh \n                           q_textbypass = q_textdh - q_textA + q_textB - q_textwhb \n                           T_textA = fracq_textdhT_textdhret + q_textBT_texttesq_textdh + q_textB \n                           T_textB = fracq_textwhbT_textwhb + q_textAT_texttesq_textwhb + q_textA \n                           T_textC = fracq_textbypassT_textA + (q_textdh - q_textbypass)T_textBq_textdh \n                           0 le q_textA perp q_textB ge 0\n    endaligned","category":"page"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"where the state variables x are T_texttes, T_textphb, and T_textwhb, the control varaibles u are q_textwhb, q_textA, q_textB, and Q_textphb, and the additional algebraic variables z are q_textbypass, T_textA, T_textB, and T_textC. The first three constraints correspond to the dynamic model of the state variables, the next three constraints are mass and energy balance equations (algebraic constraints) for mass and energy, and the last constraint correponds to the complementarity of variables q_A and q_B.","category":"page"},{"location":"pages/tes_problem.html#Implementation","page":"Thermal Energy Storage Problem","title":"Implementation","text":"","category":"section"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"Values restrictions used for this example are q_textdh = 10 text m^3texth, T_textdhret = 30 ^text otextC, 60 ^text otextC le T_textphb le 70 ^text otextC, and q_textwhb le 15 text m^3texth, and the profile for Q_textwhb is shown in the figure below. Heat from WHB matches heat necessary to bring the returned water to 60 ^text otextC for the first 10 time intervals; then, it is increased in 20 % and later decrased in 20 %. ","category":"page"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"(Image: tes_input_example)","category":"page"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"Instead of using the algorithm implementation available in this library, this problem is solved by simply adding a penalty term of the form k_cq_Aq_B, where k_c is a tuning parameter, to the objective function to enforce the complementarity condition(s). In addition, this problem has too many degrees of freedom and multiple solutions, and two different approaches for restricting the problem to one solution is implemented. In tes_reg.jl regularization terms were added to the objective function to enforce some desired behaviour (for example, avoiding frequent swaps between q_A and q_B). In tes_logic.jl, two logical constraints are added as complementatity constraints, more especifically, ","category":"page"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"    0 le T_textphbub - textmin(T_B T_textphbub) perp q_textbypass ge 0","category":"page"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"and","category":"page"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"    0 le q_textwhbub - q_textwhb perp T_textphb - T_textphblb ge 0 ","category":"page"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"The first constraint can be read as","category":"page"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"    beginaligned\n        textif  T_textB  T_textphbub \n        quad quad q_textbypass  0 \n        textotherwise \n        quad quad q_textbypass = 0 \n    endaligned","category":"page"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"Note that it has the minimum operator, which can be written as another complementary constraint using auxiliary variables (see Powell et al, 2016[1]). The second constraint says that if WHB hasn't reached full capacity, T_textphb should be kept at the minimum bound so that all excess energy provided to WHB can be kept within the system.","category":"page"},{"location":"pages/tes_problem.html","page":"Thermal Energy Storage Problem","title":"Thermal Energy Storage Problem","text":"[1]: Powell, K.M., Eaton, A.N., Hedengren, J.D. and Edgar, T.F. A continuous formulation for logical decisions in differential algebraic systems using mathematical programs with complementarity constraints. Processes, 4(1), p.7, 2016.","category":"page"},{"location":"pages/mpcc_methods.html#Methods","page":"Methods","title":"Methods","text":"","category":"section"},{"location":"pages/mpcc_methods.html#Dealing-with-MPCCs","page":"Methods","title":"Dealing with MPCCs","text":"","category":"section"},{"location":"pages/mpcc_methods.html","page":"Methods","title":"Methods","text":"create_model\nsolve_mpcc!","category":"page"},{"location":"pages/mpcc_methods.html#MPCCLibrary.create_model","page":"Methods","title":"MPCCLibrary.create_model","text":"create_model(args...)\n\nReturns a JuMP model using Ipopt as the optimization solver. args are attributes taken by the Ipopt optimizer  (e.g. print_level = 0, linear_solver = \"ma57\", etc. A list of all possible options can be found at the  Ipopt Documentation).\n\n\n\n\n\n","category":"function"},{"location":"pages/mpcc_methods.html#MPCCLibrary.solve_mpcc!","page":"Methods","title":"MPCCLibrary.solve_mpcc!","text":"solve_mpcc!(model, comp, plot_data = false, objective = :obj, args...)\n\nSolves an MPCC problem defined in JuMP using the Ipopt solver.\n\nmodel is a JuMP model initialized Ipopt Optimizer and containing the MPCC problem; comp is an array of pairs with the complementarity variables; plot_data is a boolean that defines whether the function returns data with the algorithm progress; objective is a symbol corresponding to the name of the JuMP expression that defines the objective function. args are parameters used by the MPCC algorithm.\n\nReturns 0 (if plot_data is false) or the progress data from the algorithm (if plot_data is true) if the problem converges, and -1 otherwise.\n\nNote: Pairs in comp can only contain single variables or linear expressions.\n\n\n\n\n\n","category":"function"},{"location":"pages/mpcc_methods.html#Auxiliary-methods","page":"Methods","title":"Auxiliary methods","text":"","category":"section"},{"location":"pages/mpcc_methods.html#Orthogonal-collocation","page":"Methods","title":"Orthogonal collocation","text":"","category":"section"},{"location":"pages/mpcc_methods.html","page":"Methods","title":"Methods","text":"Discretization method for handling dynamic optimization.","category":"page"},{"location":"pages/mpcc_methods.html","page":"Methods","title":"Methods","text":"collocation_mat\ncollocation_matrix","category":"page"},{"location":"pages/mpcc_methods.html#MPCCLibrary.collocation_mat","page":"Methods","title":"MPCCLibrary.collocation_mat","text":"collocation_mat(ncp = 3)\n\nReturns the collocation matrix using ncp Radau roots as collocation points.\n\nNote: DEPRECATED\n\n\n\n\n\n","category":"function"},{"location":"pages/mpcc_methods.html#MPCCLibrary.collocation_matrix","page":"Methods","title":"MPCCLibrary.collocation_matrix","text":"collocation_matrix(ncp = 3, method = \"Radau\")\n\nFunction for generating a collocation matrix using ncp collocation points with method roots.\n\nReturns the collocation matrix.\n\nPossible values are 1 to 5 for ncp, and \"Radau\" and \"Legendre\" for method.\n\nReference: Lorenz T. Biegler. Nonlinear programming: concepts, algorithms, and applications to chemical processes. Vol. 10. Siam, 2010 (Section 10.2).\n\n\n\n\n\n","category":"function"},{"location":"pages/mpcc_methods.html#Bilevel-optimization","page":"Methods","title":"Bilevel optimization","text":"","category":"section"},{"location":"pages/mpcc_methods.html","page":"Methods","title":"Methods","text":"To formulate a bilevel optimization problem as a MPCC problem, we need to add the first order conditions of the inner problem as constraints of the outer optimization problem. ","category":"page"},{"location":"pages/mpcc_methods.html","page":"Methods","title":"Methods","text":"set_bilevel_opt_problem!","category":"page"},{"location":"pages/mpcc_methods.html#MPCCLibrary.set_bilevel_opt_problem!","page":"Methods","title":"MPCCLibrary.set_bilevel_opt_problem!","text":"set_bilevel_opt_problem!(model::Model, vars::Array{JuMP.VariableRef})\n\nTakes model, which is a JuMP model corresponding to the inner level problem that to be optimized with respect to vars, an array of JuMP variables.\n\nIt modifies the model by adding variables corresponding to the multipliers of each constraint and the first order condition of the lagrangian. \n\nReturns an array with pairs of expressions and multipliers that must meet the complementarity condition.\n\nNote: So far, it can only handle constraints of the form c(x) >= 0 and c(x) = 0, where c(x) is linear or quadratic. \n\n\n\n\n\n","category":"function"},{"location":"pages/bio_problem.html#Bioprocess-Optimization-Problem","page":"Bioprocess Optimization Problem","title":"Bioprocess Optimization Problem","text":"","category":"section"},{"location":"pages/bio_problem.html#Description","page":"Bioprocess Optimization Problem","title":"Description","text":"","category":"section"},{"location":"pages/bio_problem.html","page":"Bioprocess Optimization Problem","title":"Bioprocess Optimization Problem","text":"Consider a fed-batch process of E. coli growing on glucose and acetate. We want to optimize the glucose feed to maximize cellular concentration in the end of the batch. However, instead of using Monod equation to represent cellular growth, we will use a more detailed model that uses the microrganism's metabolic network, namely flux balance analysis (FBA), so we can better represent growth on both substrates. Flux balance analysis (FBA) is essentially an optimization problem that calculates the flow of metabolites (internal or external cellular products) through a metabolic network[1], in which the objective function is usually set to maximize cellular growth. FBA was originally proposed for steady state analysis, but it has been adapted to model dynamic processes as well[2]. ","category":"page"},{"location":"pages/bio_problem.html","page":"Bioprocess Optimization Problem","title":"Bioprocess Optimization Problem","text":"[1]: Orth, J. D., Thiele, I., and Palsson, B. Ø. What is flux balance analysis? Nature biotechnology, 28(3), 245-248, 2010.","category":"page"},{"location":"pages/bio_problem.html","page":"Bioprocess Optimization Problem","title":"Bioprocess Optimization Problem","text":"[2]: Mahadevan, R., Edwards, J. S., and Doyle III, F. J. Dynamic flux balance analysis of diauxic growth in Escherichia coli. Biophysical journal, 83(3), 1331-1340, 2002.","category":"page"},{"location":"pages/bio_problem.html","page":"Bioprocess Optimization Problem","title":"Bioprocess Optimization Problem","text":"For this case study, we consider a simplified metabolic network with 4 overall reactions (only external metabolites are considered), as shown in [2], to model cellular growth.","category":"page"},{"location":"pages/bio_problem.html","page":"Bioprocess Optimization Problem","title":"Bioprocess Optimization Problem","text":"(Image: ecoli_network)","category":"page"},{"location":"pages/bio_problem.html","page":"Bioprocess Optimization Problem","title":"Bioprocess Optimization Problem","text":"The feed in this batch process contains only glucose, but acetate can be produced by the cell and is available in the medium initially. The rate of glucose uptake is limited by the Michaelis-Menten equation and availability of oxigen in the medium is limited by mass transport from the gas phase. Given a fixed amount of glucose to be added to the bioreactor, we want to find a feed flow profile that maximizes biomass concentration in the end of the process. Mathematically, this problem is formulated as","category":"page"},{"location":"pages/bio_problem.html","page":"Bioprocess Optimization Problem","title":"Bioprocess Optimization Problem","text":"    beginaligned\n        min_D quad -x_textend \n        textst quad  sum_i D_iz_textgluf = textGlu_texttotal \n                          D ge 0 \n                          min_zxv quad -sum_r in mathcalR v_r \n                          textst quad fracdz_textgludt = A^textgluvx + D(z_textgluf - z_textglu) \n                          quad quad quad fracdz_textAcdt = A^textAcvx - Dz_textAc \n                          quad quad quad fracdz_textO_2dt = A^textO_2vx - Dz_textO_2 + kLa(021 - z_textO_2) \n                          quad quad quad fracdxdt = sum_r in mathcalRv_r x - Dx \n                          quad quad quad A^textgluv le fracv_textglumaxz_textgluK_m + z_textglu \n                          quad quad quad -A^textO_2v le v_textO_2textmax \n                          quad quad quad A^textAcv le 100 \n                          quad quad quad zxv ge 0 \n    endaligned","category":"page"},{"location":"pages/bio_problem.html","page":"Bioprocess Optimization Problem","title":"Bioprocess Optimization Problem","text":"where D = FV(feed flow rate divided by the volume of the bioreactor) is the dilution rate, z_i is the concentration of the i^textth metabolite in the bioreactor, z_textgluf is the glucose concentration in the feed, Glu_texttotal is the total amount o glucose to be fed to the bioreactor during the process, v_r is the rate of reaction r in mathcalR, A is the stoichiometry matrix (superscript i means the row corresponding to metabolite i), kLa is the mass transfer coefficient for oxygen, x is biomass concentration in the bioreactor, v_textglumax and K_m are parameters for the Michaelis-Menten equation, and v_textO_2textmax is the maximum rate for oxygen consumption. ","category":"page"},{"location":"pages/bio_problem.html#Implementation","page":"Bioprocess Optimization Problem","title":"Implementation","text":"","category":"section"},{"location":"pages/bio_problem.html","page":"Bioprocess Optimization Problem","title":"Bioprocess Optimization Problem","text":"We considered two scenarios for this implementation, file fed_batch.jl implements the dynamic FBA model with constant D = textGlu_texttotalz_textgluftextNFE, where NFE is the number os finite elements in the time discretization and file fed_batch_opt.jl implements the bilevel optimization just described. The latter is reformulated as an MPCC problem and solved. Orthogonal collocation with 3 collocation points and 77 finite elements was implemented. In both cases, the required values used are","category":"page"},{"location":"pages/bio_problem.html","page":"Bioprocess Optimization Problem","title":"Bioprocess Optimization Problem","text":"A^textglu = beginarraycccc0  -946  -984  -1923endarray, \nA^textO_2 = beginarraycccc -35  -1292  -1273  0endarray, \nA^textAc = beginarraycccc -3943  0  124  1212endarray, \nx_0 = 0001 g/L, \nz_textglu0 = 1 mmol/L, \nz_textO_20 = 021 mmol/L, \nz_textAc0 = 04 mmol/L, \nv_i0 = 0, \nt_0 = 0, \nt_textend = 11 h, \nkLa = 75 h^-1, \nv_textO_2textmax = 15 mmol/gDW.h, \nv_textglumax = 10 mmol/gDW.h, \nK_m = 0015 mmol/L, \nz_textgluf = 5 mmol/L.","category":"page"},{"location":"pages/flash_problem.html#Flash-Tank-Problem","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"","category":"section"},{"location":"pages/flash_problem.html#Description","page":"Flash Tank Problem","title":"Description","text":"","category":"section"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"For this example[1], a flash tank wih feed flow F and composition z_i with i = mathcalC is considered. We want to analyze how the split between vapor V and liquid L products with composition y_i and x_i respectively vary with temperature for a fixed pressure p. We can use the Rachford-Rice equation ","category":"page"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"[1]: Kungurtsev, V. and Jäschke, J. Pathfollowing for Parametric Mathematical Programs with Complementarity Constraints. ePrints for the Optimization Community, 2019.","category":"page"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"    sum_i in mathcalCfracz_i(K_i - 1)1+a_t(K_i - 1) = 0","category":"page"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"to calculate the fraction of the feed that goes to the vapor phase (represented by a_t) with K_i given by Raoult's law","category":"page"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"    K_i = fracp_i^textsat(T)p = fracy_ix_i quad textfor i in mathcalC","category":"page"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"p_i^textsat(T) is the vapor pressure of the pure component i at temperature T calculated using Antoine's equation","category":"page"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"    log_10(p_i^textsat) = A_i - fracB_iT + C_i","category":"page"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"where A_i, B_i and C_i are constants for each compound i. ","category":"page"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"A problem with this formulation is that, if T is lower than the mixture's bubble point or larger than its dew point, a_t assumes negative values and values greater than one respectively and, since a_t represents the ratio VF, that would be physically impossible. We can deal with it by formulating this problem as an optimization problem with complementarity constraints that enforce VF to be 0 if T is lower than bubble point and 1 if it is larger than dew point. ","category":"page"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"The optimization problem is then modeled as ","category":"page"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"    beginaligned\n        min quad frac12(aF - V)^2 dt \n                st quad sum_i in mathcalCfracz_i(K_i - 1)1+a_t(K_i - 1) = 0 \n                           K_i = fracp_i^textsatp quad textfor i in mathcalC \n                           K_i = fracy_ix_i quad textfor i in mathcalC \n                           log_10(p_i^textsat) = A_i - fracB_iT + C_i quad textfor i in mathcalC \n                           L + V = F \n                           Lx_i + Vy_i = Fz_i quad textfor i in mathcalC \n                           a - s_V + s_L - a_t = 0 \n                           0 le s_V perp V ge 0 \n                           0 le s_L perp L ge 0 \n                           0 le a le 1 \n                           L V ge 0 \n                           K_i p_i^textsat x_i y_i ge 0 quad textfor i in mathcalC\n    endaligned","category":"page"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"The 5^textth and 6^textth constraints correspond to material balances, total and componentwise respectively. Constraints 7-10 describe the complementarity conditions, s_L and s_V are slacks variables that represent how much a_t is lower than 0 and larger than 1 respectively. Variable a, then, represents the actual ratio VF, which is enforced by the 7^textth and 10 ^textth constraints. Note that a = VF is not enforced as a hard constraint and, instead, is used as the objective function. ","category":"page"},{"location":"pages/flash_problem.html#Implementation","page":"Flash Tank Problem","title":"Implementation","text":"","category":"section"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"The implementation in flash.jl uses","category":"page"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"F = 1, \nT in 380400 in increments of 1 K, \nand 3 compounds with the following Antoine's constants and inlet composition","category":"page"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"Compound A B C z\n1 3.97786 1064.84 -41.136 0.5\n2 4.00139 1170.875 -48.833 0.3\n3 3.93002 1182.774 -52.532 0.2","category":"page"},{"location":"pages/flash_problem.html","page":"Flash Tank Problem","title":"Flash Tank Problem","text":"This problem is solved using the solve_mpcc! function provided with the default parameters.  ","category":"page"},{"location":"pages/mpec_collection.html#MacMPEC-Collection","page":"MPEC Collection","title":"MacMPEC Collection","text":"","category":"section"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"This library contains some selected MPCC problems from the MacMPEC Collection originally built in AMPL by Sven Leyffer. For this library, these problems were written in Julia as a JuMP model and they are described below along with a link to the .jl file in the github repository.","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"bar-truss-3","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"Minimum weight design problem from M.C. Ferris and F. Tin-Loi, On the solution of a minimumWeight elastoplastic problem involving displacement and complementarity constraints, Comp. Meth. in Appl. Mech & Engng, 174:107-120, 1999.","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"Goal: minimize the volume of a struture with fixed topology that has to resist certain specified loads while keeping displacements within a specified limit. ","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"    beginaligned\n    min quad L^Ta \n    textst quad Q = SCw - SNz \n                quad F = C^TQ \n                quad w = -N^TQ + Hz + r \n                quad S_i = Ea_iL_i text for  i = 1ldotsnm \n                quad H_ijk = 0125S_j text for  j = k text and  i = 1ldotsnm \n                quad H_ijk = 0 text for  j neq k text and  i = 1ldotsnm \n                quad r_ij = sigma a_i text for  j = 1ldotsny text and  i = 1ldotsnm \n                quad Ta = 0 \n                quad a ge 0 \n                quad -u^b le u le u^b \n                quad 0 le w perp z ge 0\n    endaligned","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"where the variables are  ","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"u in mathbbR^nd - displacements  \nz in mathbbR^ny - plastic multipliers  \na in mathbbR^nm - cross-sectional areas  \nQ in mathbbR^nm - natural generalized stresses  \nS in mathbbR^nm - element stiffness  \nH_i in mathbbR^ny times ny - hardening models  \nr_i in mathbbR^ny - yield limits  \nw_i(Q(z)z) mathbbR^ny rightarrow mathbbR^ny - linear yield function  ","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"and parameters are ","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"    L = beginbmatrix 500  400  500 endbmatrix^T quad F = beginbmatrix 400  600 endbmatrix^T\n    quad C = beginbmatrix 06  00  -06  08  10  08 endbmatrix^T quad N = beginbmatrix 1  1  1  -1  -1  -1 endbmatrix^T ","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"E = 2e4  \nsigma = 50.  ","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"nm is the number of elements, nd is the number of structure degrees of freedom and ny is the number of yield functions per element. \n(Ta = 0 corresponds to technoogical constraints on the design variables a)","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"bard1","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"Two-level optimization toy model presented in J.F. Bard, Convex two-level optimization, Mathematical Programming 40(1), 15-27, 1988.","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"    beginaligned\n    min_x ge 0 quad (x - 5)^2 + (2y + 1)^2 \n    textst quad min_y ge 0 quad (y - 1)^2 - 15xy \n    textst quad 3x - y ge 3 \n                     quad quad -x + 05y ge 4 \n                     quad quad -x -y ge -7\n    endaligned","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"It can be reformulated as a MPCC problem by using the KKT conditions of the inner problem as constraints for the outer problem.","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"    beginaligned\n    min_xy ge 0 quad (x - 5)^2 + (2y + 1)^2 \n    textst quad 2(y - 1) - 15x + lambda_1 - 05lambda_2 + lambda_3 = 0 \n                      0 le 3x - y -3 perp lambda_1 ge  \n                      0 le -x + 05y + 4 perp lambda_2 ge 0 \n                      0 le -x -y + 7 perp lambda_ 3 ge 0\n    endaligned","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"where lambda_i is the Lagrange multiplier corresponding to the i^textth inequality of the inner problem.","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"ralph2","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"Toy model","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"    beginaligned\n    min_xy quad x^2 + y^2 - 4xy \n    textst quad 0 le x perp y ge 0\n    endaligned","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"scale1","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"Toy model","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"    beginaligned\n    min_xy quad (100x - 1)^2 + (y - 1)^2 \n    textst quad 0 le x perp y ge 0\n    endaligned","category":"page"},{"location":"pages/mpec_collection.html","page":"MPEC Collection","title":"MPEC Collection","text":"","category":"page"},{"location":"pages/biopt_problem.html#Bilevel-Optimization-Problem","page":"Bilevel Optimization Problem","title":"Bilevel Optimization Problem","text":"","category":"section"},{"location":"pages/biopt_problem.html","page":"Bilevel Optimization Problem","title":"Bilevel Optimization Problem","text":"Two toy models[1] are implemented as simple examples of bilevel optimization problems. They are solved by being reformulated as MPCCs problems, in which the first-order conditions of the inner problem are added as constraints of the outer problem. Implementation of the following models can be found in bilevel.jl","category":"page"},{"location":"pages/biopt_problem.html","page":"Bilevel Optimization Problem","title":"Bilevel Optimization Problem","text":"[1]: Dempe, S. Bilevel optimization: Reformulation and first optimality conditions. Generalized Nash Equilibrium Problems, Bilevel Programming and MPEC, pp. 1-20. Springer, 2017.","category":"page"},{"location":"pages/biopt_problem.html#Toy-Model-1","page":"Bilevel Optimization Problem","title":"Toy Model 1","text":"","category":"section"},{"location":"pages/biopt_problem.html","page":"Bilevel Optimization Problem","title":"Bilevel Optimization Problem","text":"    beginaligned\n    min_xy quad (x - 1)^2 + (y - 1)^2 \n    textst quad min_y quad -y \n    text st quad x + y le 1 \n    quad quad - x + y le 1\n    endaligned","category":"page"},{"location":"pages/biopt_problem.html#Toy-Model-2","page":"Bilevel Optimization Problem","title":"Toy Model 2","text":"","category":"section"},{"location":"pages/biopt_problem.html","page":"Bilevel Optimization Problem","title":"Bilevel Optimization Problem","text":"    beginaligned\n    min_ab quad - a - 2b \n    textst quad 2a - 3b ge -12 \n    a + b le 14 \n    min_b quad -b \n    text st quad -3a + b le -3 \n    quad quad quad 3a + b le 30\n    endaligned","category":"page"},{"location":"index.html#Introduction","page":"Introduction","title":"Introduction","text":"","category":"section"},{"location":"index.html","page":"Introduction","title":"Introduction","text":"Mathematical programs with complementarity constraints (MPCC) are optimization problems of the form","category":"page"},{"location":"index.html","page":"Introduction","title":"Introduction","text":"    beginaligned\n    min quad varphi = f(x y z) \n    textst quad h(x y z) = 0 \n    g(x y z) ge 0 \n    0 le x perp y ge 0\n    endaligned  ","category":"page"},{"location":"index.html","page":"Introduction","title":"Introduction","text":"in which the last constraint means that either x in mathbbR^n ge 0 or y in mathbbR^n ge 0. They can be used to model processes that, for example, present switches or nonsmooth decisions with the advantage of incorporating discrete decisions in a single nonlinear programming (NLP) formulation[1]. ","category":"page"},{"location":"index.html","page":"Introduction","title":"Introduction","text":"[1]: Lorenz T. Biegler. Nonlinear programming: concepts, algorithms, and applications to chemical processes. Vol. 10. Siam, 2010","category":"page"},{"location":"index.html","page":"Introduction","title":"Introduction","text":"This library is intended to be a compilation of MPCC (Mathematical Programs with Complementarity Constraints) problems to test algorithms developed in Julia using JuMP as modeling language and to be used as case studies. It also contains an implementation of the first algorithm proposed by Leyffer et al (2006)[2] that can be used to solve examples in this library.","category":"page"},{"location":"index.html","page":"Introduction","title":"Introduction","text":"[2]: Leyffer, S., López-Calva, G. and Nocedal, J. Interior methods for mathematical programs with complementarity constraints. SIAM Journal on Optimization, 17(1), pp.52-77, 2006.","category":"page"},{"location":"index.html","page":"Introduction","title":"Introduction","text":"Pages = [\n    \"pages/flash_problem.md\"\n    \"pages/tes_problem.md\"\n    \"pages/bio_problem.md\"\n    \"pages/biopt_problem.md\"\n    \"pages/mpec_collection.md\"\n    \"pages/mpcc_methods.md\"\n    ]\nDepth = 4","category":"page"}]
}
